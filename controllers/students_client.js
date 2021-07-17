const axios = require('axios')
const Student = require('../models/student')
const asyncHandler = require('../middleware/async')


exports.index = (req, res) => {
  res.render("index")
}

exports.students = asyncHandler(async (req, res, next) => {
  const students = await Student.find({}).select("studentId firstName lastName preferredEsport flag").exec();
  res.render("students", { students })
})

exports.studentsNew = (req, res) => {
  res.render("studentsNew")
}

exports.studentsCreate = (req, res) => {
  axios.post("http://localhost:3000/api/v1/students", req.body)
  .then((response) => {
    console.log("response:", response)
    res.redirect("/")
  })
  .catch((err) => {
    console.log("err:", err);
    res.redirect("/")
  })

}

exports.studentsShow = asyncHandler(async (req, res, next) => {
  const student = await Student.findOne({studentId: req.params.id});

  res.render("studentsShow", { student })
})
