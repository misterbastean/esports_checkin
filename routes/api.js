const express = require('express')
const { getStudents, getStudent, createStudent, updateStudent } = require('../controllers/students')
const router = express.Router()

router.route("/students").get(getStudents).post(createStudent)

router.route("/students/:id").get(getStudent).put(updateStudent)

module.exports = router;
