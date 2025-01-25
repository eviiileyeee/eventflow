const express = require('express');
const { register, login } = require('../controllers/authController');
const { deleteAllUsers,getAllUsers } = require('../controllers/authController');


const router = express.Router();

router.delete('/delete-all-users', deleteAllUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/get-all-users', getAllUsers);

module.exports = router;
