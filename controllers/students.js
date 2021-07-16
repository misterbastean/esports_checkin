const Student = require('../models/student')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse');

exports.getStudents = asyncHandler(async (req, res, next) => {
  const data = await Student.find().select('studentId firstName lastName email flag preferredEsport').exec();
  res.status(200).json({
    success: true,
    count: data.length,
    data
  })
})

exports.getStudent = asyncHandler(async (req, res, next) => {
  const data = await Student.find({studentId: req.params.id})
  if (!data || data.length === 0) {
    return next(
      new ErrorResponse(`Student not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data
  })
})

exports.createStudent = asyncHandler(async (req, res, next) => {
  const newStudent = {
    studentId: req.body.studentId,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
    email: req.body.email,
    preferredEsport: req.body.preferredEsport,
    gameName: req.body.gameName,
    adminMessages: [],
		punches: []
  }

  const data = await Student.create(newStudent)
})
