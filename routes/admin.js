const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const DataStore = require('../models/dataStore');
const { ensureAdmin } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Admin dashboard
router.get('/', ensureAdmin, (req, res) => {
  try {
    const users = DataStore.getUsers();
    res.render('admin/dashboard', { 
      title: 'Admin Dashboard',
      users: users
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error loading admin dashboard');
    res.redirect('/dashboard');
  }
});

// Manage users
router.get('/users', ensureAdmin, (req, res) => {
  try {
    const users = DataStore.getUsers();
    res.render('admin/users', { 
      title: 'Manage Users',
      users: users
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error loading users');
    res.redirect('/admin');
  }
});

// Add user page
router.get('/users/add', ensureAdmin, (req, res) => {
  res.render('admin/add-user', { title: 'Add User' });
});

// Add user POST
router.post('/users/add', ensureAdmin, [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['associate', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('admin/add-user', {
      title: 'Add User',
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    await DataStore.createUser(req.body);
    req.flash('success_msg', 'User created successfully');
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', error.message || 'Error creating user');
    res.render('admin/add-user', {
      title: 'Add User',
      formData: req.body
    });
  }
});

// Edit user page
router.get('/users/edit/:id', ensureAdmin, (req, res) => {
  try {
    const user = DataStore.findUserById(req.params.id);
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/admin/users');
    }
    res.render('admin/edit-user', { 
      title: 'Edit User',
      editUser: user
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error loading user');
    res.redirect('/admin/users');
  }
});

// Edit user POST
router.post('/users/edit/:id', ensureAdmin, async (req, res) => {
  try {
    const updates = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      memberNumber: req.body.memberNumber,
      doterraSiteUrl: req.body.doterraSiteUrl,
      role: req.body.role,
      active: req.body.active === 'true'
    };

    // Only update password if provided
    if (req.body.password && req.body.password.trim() !== '') {
      updates.password = req.body.password;
    }

    await DataStore.updateUser(req.params.id, updates);
    req.flash('success_msg', 'User updated successfully');
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error updating user');
    res.redirect('/admin/users/edit/' + req.params.id);
  }
});

// Delete user
router.post('/users/delete/:id', ensureAdmin, (req, res) => {
  try {
    // Prevent deleting yourself
    if (req.params.id === req.session.user.id) {
      req.flash('error_msg', 'You cannot delete your own account');
      return res.redirect('/admin/users');
    }

    DataStore.deleteUser(req.params.id);
    req.flash('success_msg', 'User deleted successfully');
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error deleting user');
    res.redirect('/admin/users');
  }
});

// Content management
router.get('/content', ensureAdmin, (req, res) => {
  try {
    const content = DataStore.getContent();
    res.render('admin/content', { 
      title: 'Manage Content',
      content: content
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error loading content');
    res.redirect('/admin');
  }
});

// Update content
router.post('/content/:section', ensureAdmin, async (req, res) => {
  try {
    const section = req.params.section;
    const data = req.body;
    
    // Handle features array for homepage
    if (section === 'homePage' && data.features) {
      data.features = JSON.parse(data.features);
    }
    
    DataStore.updateContent(section, data);
    req.flash('success_msg', 'Content updated successfully');
    res.redirect('/admin/content');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error updating content');
    res.redirect('/admin/content');
  }
});

module.exports = router;
