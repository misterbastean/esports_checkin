const express = require('express')
const router = express.Router()
const { index, students, studentsNew, studentsCreate, studentsShow } = require("../controllers/students_client")

// Landing page
router.route("/").get(index)

//Students
router.route("/students").get(students).post(studentsCreate)
router.route("/students/new").get(studentsNew)
router.route("/students/:id").get(studentsShow)


module.exports = router;
