const User = require('../models/user');
const passport = require('passport');

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.register = async (req, res) => {
  try {
    const newUser = await User.register(new User(req.body), req.body.password);
    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
