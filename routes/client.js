const express = require('express')
const router = express.Router()

// Landing page
router.get('/', (req, res) => {
  res.render('index')
})

// New Student Form
router.get("/students/new", (req, res) => {
  res.render("studentsNew")
})

// View Student Form

module.exports = router;
