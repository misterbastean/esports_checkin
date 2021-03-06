const User = require('../models/user');
const passport = require('passport');

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.register = async (req, res) => {
  if (req.body.password.length < 10) {
    req.flash('error', 'Password must be at least 10 characters long.');
    return res.redirect('/register');
  }

  if (req.body.password !== req.body.confirmPassword) {
    req.flash('error', 'Passwords did not match.');
    return res.redirect('/register');
  }

  try {
    const newUser = await User.register(new User(req.body), req.body.password).catch((err) => {
      throw new Error(err.message);
    });

    passport.authenticate('local')(req, res, () => {
      req.flash('success', 'New coach registered.');
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    if (err.message.startsWith('E11000')) {
      req.flash('error', 'An account with that email address already exists.');
    } else {
      req.flash('error', err.message);
    }
    res.redirect('/register');
  }
};

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'Logged in successfully',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Logged out successfully');
  res.redirect('/');
};

exports.showResetPassword = (req, res) => {
  res.render('resetPassword');
};

exports.resetPassword = async (req, res) => {
  // Verify new password and confirmation new password match
  if (req.body.newPassword !== req.body.confirmNewPassword) {
    req.flash('error', 'Password confirmation did not match.');
    return res.redirect('/reset');
  }
  // Verify password matches and reset to new
  const user = await User.findById(req.user._id);
  if (!user) {
    req.flash('error', 'Error finding user.');
    return res.redirect('/');
  }
  user
    .changePassword(req.body.currentPassword, req.body.newPassword)
    .then(() => {
      req.flash('success', 'Password updated');
      return res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      req.flash('error', err.message);
      return res.redirect('/reset');
    });
};
