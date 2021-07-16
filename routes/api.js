const express = require('express')
const { getStudents } = require('../controllers/students')
const router = express.Router()

router.route("/").get(getStudents)

module.exports = router;
