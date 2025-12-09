// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view this resource');
  res.redirect('/auth/login');
}

// Middleware to check if user is admin
function ensureAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  req.flash('error_msg', 'You do not have permission to access this resource');
  res.redirect('/');
}

// Middleware to check if user is already logged in
function redirectIfAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  next();
}

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  redirectIfAuthenticated
};
