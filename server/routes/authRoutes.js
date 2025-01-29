const express = require('express');
const { register, login , deleteAllUsers , getAllUsers , getMe , uploadDetails} = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware');


const router = express.Router();

router.delete('/delete-all-users', deleteAllUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/upload-details',protect , uploadDetails)
router.get('/get-all-users', getAllUsers);
router.get('/me', protect, getMe);


module.exports = router;
