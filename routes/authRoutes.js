const express = require('express');
const { login } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);

router.get('/protected', authenticate, (req, res) => {
    res.json({ message: `Hello, user ${req.user.userId}` });
});

module.exports = router;
