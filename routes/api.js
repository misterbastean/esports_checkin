const express = require('express')
const { getStudents, getStudent, createStudent } = require('../controllers/students')
const router = express.Router()

router.route("/students").get(getStudents).post(createStudent)

router.route("/students/:id").get(getStudent)

module.exports = router;
