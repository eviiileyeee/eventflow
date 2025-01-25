const express = require('express');
const { register, login } = require('../controllers/authController');
const { deleteAllUsers } = require('../controllers/authController');

const router = express.Router();


// Route to delete all users
router.delete('/delete-all-users', deleteAllUsers);
// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
