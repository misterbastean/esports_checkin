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
const { showRegister, register, showLogin, login, logout } = require('../controllers/auth_client');
const { isLoggedIn } = require('../middleware/isLoggedIn');

// Landing page
router.route('/').get(index);

// Students
router.route('/students').get(isLoggedIn, students).post(studentsCreate);
router.route('/students/new').get(studentsNew);
router.route('/students/:id').get(isLoggedIn, studentsShow);

// Punches
router.route('/in').get(punchIn);
router.route('/out').get(punchOut);
router.route('/punches').post(punchCreate);

// Auth
router.route('/register').get(showRegister).post(register);
router.route('/login').get(showLogin).post(login);
router.route('/logout').get(logout).post(logout);

module.exports = router;
