const axios = require('axios');
const moment = require('moment');
const Student = require('../models/student');
const asyncHandler = require('../middleware/async');

exports.punchIn = (req, res) => {
  res.render('punchIn');
};

exports.punchOut = (req, res) => {
  res.render('punchOut');
};

exports.punchCreate = asyncHandler(async (req, res, next) => {
  const student = await Student.findOne({ studentId: req.body.studentId });
  if (!student) {
    console.log(`Student with ID of ${req.body.studentId} not found.`);
    return res.redirect('/');
  }

  axios
    .post(`http://localhost:3000/api/v1/students/${req.body.studentId}/punches`, req.body)
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      const date = new Date(response.data.rawDate);
      const dateOptions = { hour: 'numeric', minute: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-US', dateOptions);
      if (response.data.type === 'in') {
        req.flash(
          'success',
          `Punched in ${formattedDate} on computer #${response.data.computerNumber}`
        );
      } else if (response.data.type === 'out') {
        req.flash('success', `Punched out ${formattedDate}.`);
      }

      // Notify if student flagged
      if (response.flag === 'yellow') {
        req.flash('danger', 'YELLOW FLAG');
      } else if (response.flag === 'orange') {
        req.flash('danger', 'ORANGE FLAG');
      } else if (response.flag === 'red') {
        req.flash('danger', 'RED FLAG');
      }

      res.redirect('/');
    })
    .catch((err) => {
      console.log('err:', err);
      req.flash('error', err.message);
      res.redirect('/');
    });
});
