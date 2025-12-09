const express = require('express');
const router = express.Router();
const DataStore = require('../models/dataStore');
const { ensureAuthenticated } = require('../middleware/auth');

// Home page
router.get('/', (req, res) => {
  try {
    const content = DataStore.getContent();
    res.render('index', { 
      title: 'Home',
      content: content.homePage
    });
  } catch (error) {
    console.error(error);
    res.render('index', { 
      title: 'Home',
      content: {
        title: 'Welcome to Iterra-GO',
        subtitle: 'Your Gateway to doTERRA Success',
        heroText: 'Build your doTERRA business with professional tools and guidance',
        features: []
      }
    });
  }
});

// About page
router.get('/about', (req, res) => {
  try {
    const content = DataStore.getContent();
    res.render('about', { 
      title: 'About',
      content: content.aboutPage
    });
  } catch (error) {
    console.error(error);
    res.render('about', { 
      title: 'About',
      content: {
        title: 'About Iterra-GO',
        content: 'Iterra-GO is your comprehensive platform for building and managing your doTERRA business.'
      }
    });
  }
});

// Dashboard (protected)
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { 
    title: 'Dashboard',
    user: req.session.user
  });
});

// Redirect to personal doTERRA site
router.get('/my-site', ensureAuthenticated, (req, res) => {
  const user = req.session.user;
  
  if (user.doterraSiteUrl) {
    res.redirect(user.doterraSiteUrl);
  } else {
    req.flash('error_msg', 'You have not set up your doTERRA site URL yet. Please update your profile.');
    res.redirect('/dashboard');
  }
});

module.exports = router;
