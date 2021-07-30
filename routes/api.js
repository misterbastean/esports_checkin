const express = require('express');
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/students_api');
const { getPunches, createPunch } = require('../controllers/punches_api');
const { register, login, getMe } = require('../controllers/auth_api');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Students
router.route('/students').get(protect, getStudents).post(protect, createStudent);
router
  .route('/students/:id')
  .get(protect, getStudent)
  .put(protect, updateStudent)
  .delete(protect, deleteStudent);

// Punches
router.route('/students/:id/punches').get(protect, getPunches).post(protect, createPunch);

// Auth
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);

module.exports = router;
