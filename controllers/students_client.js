const moment = require('moment');
const axios = require('axios');
const Student = require('../models/student');
const asyncHandler = require('../middleware/async');
const getMinutesBetweenDates = require('../utils/getMinutesBetweenDates');

exports.index = (req, res) => {
  res.render('index');
};

exports.students = asyncHandler(async (req, res, next) => {
  const students = await Student.find({})
    .select('studentId firstName lastName preferredEsport flag')
    .exec();
  res.render('students', { students });
});

exports.studentsNew = (req, res) => {
  res.render('studentsNew');
};

exports.studentsCreate = (req, res) => {
  axios
    .post('http://localhost:3000/api/v1/students', req.body)
    .then((response) => {
      console.log('response:', response);
      res.redirect('/');
    })
    .catch((err) => {
      console.log('err:', err);
      res.redirect('/');
    });
};

exports.studentsShow = asyncHandler(async (req, res, next) => {
  const student = await Student.findOne({ studentId: req.params.id });

  // Punch formatting for time
  const punches = [];
  student.punches.forEach((punch) => {
    const date = moment(punch.rawDate).format('M/DD/YY');
    const time = moment(punch.rawDate).format('hh:mm A');

    punches.push({
      date,
      time,
      type: punch.type,
    });
  });

  // Total time
  let totalTime = 0;
  for (let i = 0; i < student.punches.length; i += 2) {
    // Check types
    if (
      (student.punches[i].type === 'in' || student.punches[i].type === 'in (missed)') &&
      student.punches[i + 1] !== undefined &&
      (student.punches[i + 1].type === 'out' || student.punches[i + 1].type === 'out (missed)')
    ) {
      const punchIn = student.punches[i].rawDate;
      const punchOut = student.punches[i + 1].rawDate;
      const diffMinutes = getMinutesBetweenDates(punchIn, punchOut);
      totalTime += diffMinutes;
    } else if (student.punches[i].type === 'in' && student.punches[i + 1] === undefined) {
      // Did not punch out
      const punchIn = student.punches[i].rawDate;
      const punchOut = new Date();
      const diffMinutes = Math.round((((punchOut - punchIn) % 86400000) % 3600000) / 60000);
      totalTime += diffMinutes;
    } else {
      // TODO: Add error handling
      totalTime = 'ERR';
    }
  }

  res.render('studentsShow', { student, punches, totalTime });
});
