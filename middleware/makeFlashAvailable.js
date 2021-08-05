const makeFlashAvailable = (req, res, next) => {
  res.locals.errorMessage = req.flash('error');
  res.locals.successMessage = req.flash('success');
  res.locals.dangerMessage = req.flash('danger');
  next();
};

module.exports = makeFlashAvailable;
