const express = require('express')
const { getStudents, getStudent, createStudent, updateStudent, deleteStudent } = require('../controllers/students')
const { getPunches, createPunch } = require('../controllers/punches')
const router = express.Router()

// Students
router.route("/students").get(getStudents).post(createStudent)
router.route("/students/:id").get(getStudent).put(updateStudent).delete(deleteStudent)


// Punches
router.route("/students/:id/punches").get(getPunches).post(createPunch)
module.exports = router;
