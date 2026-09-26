const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'Token valid', user: req.user });
});

router.get('/admin-only', authMiddleware, roleMiddleware(1), (req, res) => {
  res.json({ message: 'Welcome admin' });
});

module.exports = router;