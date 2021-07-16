const Student = require('../models/student')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse');

exports.getStudents = asyncHandler(async (req, res) => {
  const data = await Student.find();
  res.status(200).json({
    success: true,
    count: data.length,
    data
  })
})

exports.createStudent = asyncHandler(async (req, res) => {
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
