const express = require('express')
const router = express.Router()

// Landing page
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router;
