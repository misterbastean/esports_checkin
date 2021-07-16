const Student = require('../models/student')

exports.getStudents = async (req, res) => {
  const data = await Student.find();
  res.status(200).json({
    success: true,
    cound: data.length,
    data
  })
}
