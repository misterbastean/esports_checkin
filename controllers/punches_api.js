const moment = require('moment')
const Student = require('../models/student')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse');

exports.getPunches = asyncHandler(async (req, res, next) => {
  const data = await Student.find().select('punches').exec();
  res.status(200).json({
    success: true,
    count: data.length,
    data
  })
})

exports.createPunch = asyncHandler(async (req, res, next) => {
  const data = await Student.findOne({studentId: req.params.id})
  if (!data) {
    return next(
      new ErrorResponse(`Student not found with id of ${req.params.id}`, 404)
    );
  }

  // Create new punch object
  const currentDate = moment()
  const newPunch = {
    rawDate: new Date(),
    date: currentDate.format('M-D-YYYY'),
    time: currentDate.format('h:mm a'),
    type: req.body.type
  }

  data.punches.push(newPunch)
  data.save()

  res.status(201).json({
    success: true,
    data: newPunch
  })
})
