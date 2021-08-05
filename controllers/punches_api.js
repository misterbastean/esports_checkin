const Student = require('../models/student');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

exports.getPunches = asyncHandler(async (req, res, next) => {
  const data = await Student.find().select('punches').exec();
  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});

exports.createPunch = asyncHandler(async (req, res, next) => {
  let extraPunchAdded = false;
  const student = await Student.findOne({ studentId: req.params.id });
  if (!student) {
    return next(new ErrorResponse(`Student not found with id of ${req.params.id}`, 404));
  }

  // Check if previous punch was opposite type (checking for missed punches)
  if (
    student.punches.length > 0 &&
    req.body.type === student.punches[student.punches.length - 1].type
  ) {
    console.log('same punch type');
    // Add extra punch of opposite type as placeholder, with time of 2 hours after previous punch
    // This will be updated later to add the ability for admins to override these punches
    let extraPunchTime = student.punches[student.punches.length - 1].rawDate;

    // Adjust time to 2 hours before or after, depending on type
    if (req.body.type === 'in') {
      if (false) {
        // If last punch time + 2 hours < current time
      } else {
        extraPunchTime.setHours(extraPunchTime.getHours() + 2);
      }
    } else if (req.body.type === 'out') {
      if (false) {
        // If last punch time - 2 hours < current time
      } else {
        extraPunchTime.setHours(extraPunchTime.getHours() - 2);
      }
    } else {
      throw new Error('Error adjusting time for make-up punch');
    }

    // Set punch type to opposite of current punch type
    let extraPunchType;
    if (req.body.type === 'in') {
      extraPunchType = 'out (missed)';
    } else if (req.body.type === 'out') {
      extraPunchType = 'in (missed)';
    } else {
      throw new Error('Error setting extra punch type');
    }

    const extraPunch = {
      rawDate: extraPunchTime,
      type: extraPunchType,
      computerNumber: '???',
    };
    student.punches.push(extraPunch);
    extraPunchAdded = true;
  }

  // Set Computer Number
  // TODO: Test this whenever "extraPunch" above needs to be added
  let computerNumber;
  if (student.punches[student.punches.length - 1] === 'in') {
    // If previous punch is "in", so this is an "out" punch
    if (!extraPunchAdded) {
      computerNumber = student.punches[student.punches.length - 1].computerNumber;
    } else {
      computerNumber = '???';
    }
  } else {
    computerNumber = req.body.computerNumber;
  }

  // Create new punch object
  const newPunch = {
    rawDate: new Date(),
    type: req.body.type,
    computerNumber,
  };

  student.punches.push(newPunch);
  student.save();

  res.status(201).json({
    success: true,
    data: newPunch,
    flag: student.flag,
  });
});
