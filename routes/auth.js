const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const DataStore = require('../models/dataStore');
const { redirectIfAuthenticated, ensureAuthenticated } = require('../middleware/auth');

// Login page
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

// Login POST
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('auth/login', {
      title: 'Login',
      errors: errors.array(),
      username: req.body.username
    });
  }

  try {
    const { username, password } = req.body;
    const user = await DataStore.validateUser(username, password);

    if (!user) {
      req.flash('error_msg', 'Invalid username or password');
      return res.render('auth/login', {
        title: 'Login',
        username: req.body.username
      });
    }

    if (!user.active) {
      req.flash('error_msg', 'Your account has been deactivated. Please contact support.');
      return res.render('auth/login', {
        title: 'Login',
        username: req.body.username
      });
    }

    // Store user in session (without password)
    const { password: _, ...userWithoutPassword } = user;
    req.session.user = userWithoutPassword;

    req.flash('success_msg', 'Welcome back!');
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'An error occurred during login');
    res.redirect('/auth/login');
  }
});

// Register page
router.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

// Register POST
router.post('/register', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('memberNumber').trim().notEmpty().withMessage('doTERRA member number is required'),
  body('doterraSiteUrl').isURL().withMessage('Please enter a valid doTERRA site URL')
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('auth/register', {
      title: 'Register',
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    const { username, email, password, firstName, lastName, memberNumber, doterraSiteUrl } = req.body;

    await DataStore.createUser({
      username,
      email,
      password,
      firstName,
      lastName,
      memberNumber,
      doterraSiteUrl,
      role: 'associate'
    });

    req.flash('success_msg', 'Registration successful! Please log in.');
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', error.message || 'An error occurred during registration');
    res.render('auth/register', {
      title: 'Register',
      formData: req.body
    });
  }
});

// Profile page
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('auth/profile', { 
    title: 'Profile',
    user: req.session.user
  });
});

// Update profile
router.post('/profile', ensureAuthenticated, [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('memberNumber').trim().notEmpty().withMessage('doTERRA member number is required'),
  body('doterraSiteUrl').isURL().withMessage('Please enter a valid doTERRA site URL')
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('auth/profile', {
      title: 'Profile',
      user: req.session.user,
      errors: errors.array()
    });
  }

  try {
    const { email, firstName, lastName, memberNumber, doterraSiteUrl, password } = req.body;
    
    const updates = {
      email,
      firstName,
      lastName,
      memberNumber,
      doterraSiteUrl
    };

    // Only update password if provided
    if (password && password.trim() !== '') {
      updates.password = password;
    }

    const updatedUser = await DataStore.updateUser(req.session.user.id, updates);
    
    // Update session
    const { password: _, ...userWithoutPassword } = updatedUser;
    req.session.user = userWithoutPassword;

    req.flash('success_msg', 'Profile updated successfully');
    res.redirect('/auth/profile');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'An error occurred while updating profile');
    res.redirect('/auth/profile');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
