const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/auth.controller.js');
const { protect } = require('../middleware/auth.middleware.js');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
