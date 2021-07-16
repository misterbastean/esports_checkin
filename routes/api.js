const express = require('express')
const { getStudents, getStudent } = require('../controllers/students')
const router = express.Router()

router.route("/students").get(getStudents)

router.route("/students/:id").get(getStudent)

module.exports = router;
