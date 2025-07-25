const express = require('express');
const { register, login , getMe , uploadDetails ,getAllUsers  } = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put("/uploadDetails/:id", upload.single("profileImage"), protect, uploadDetails);
router.get('/me', protect, getMe);
router.get('/getAllUsers', getAllUsers)

module.exports = router;
