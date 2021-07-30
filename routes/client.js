const express = require('express');
const router = express.Router();
const {
  index,
  students,
  studentsNew,
  studentsCreate,
  studentsShow,
} = require('../controllers/students_client');
const { punchIn, punchOut, punchCreate } = require('../controllers/punches_client');
const { protect } = require('../middleware/auth');

// Landing page
router.route('/').get(index);

// Students
router.route('/students').get(protect, students).post(studentsCreate);
router.route('/students/new').get(studentsNew);
router.route('/students/:id').get(protect, studentsShow);

// Punches
router.route('/in').get(punchIn);
router.route('/out').get(punchOut);
router.route('/punches').post(punchCreate);

module.exports = router;
