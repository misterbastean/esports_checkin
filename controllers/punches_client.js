const axios = require('axios')
const moment = require('moment')
const Student = require('../models/student')
const asyncHandler = require('../middleware/async')


exports.punchIn = (req, res) => {
  res.render("punchIn")
}

exports.punchOut = (req, res) => {
  res.render("punchOut")
}

exports.punchCreate = asyncHandler(async (req, res, next) => {
  console.log("body:", req.body);
  const student = await Student.findOne({studentId: req.body.studentId})
  if (!student) {
    console.log(`Student with ID of ${req.body.studentId} not found.`)
    return res.redirect("/")
  }

  axios.post(`http://localhost:3000/api/v1/students/${req.body.studentId}/punches`, req.body)
  .then((response) => {
    console.log("response:", response);
    res.redirect("/")
  })
  .catch((err) => {
    console.log("err:", err);
    res.redirect("/")
  })
})
