const router = require('express').Router();
const { updateUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateUser } = require('../middleware/validateMiddleware');

router.get('/profile', authMiddleware, getUserProfile);
router.put('/update', authMiddleware, validateUser, updateUser);

module.exports = router;