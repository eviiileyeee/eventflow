const User = require('../models/userModel');
const bcryptjs = require('bcryptjs'); // Change to bcryptjs for consistency
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');


// Generate JWT Token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register user
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or username already exists'
      });
    }

    // Create new user (password will be hashed by pre-save middleware)
    const newUser = new User({
      username,
      password,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password.'
      });
    }

    // Find user by email and explicitly select password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password using the method from User model
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      message: 'Server error during login',
      error: error.message
    });
  }
};

exports.uploadDetails = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.save();
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ message: 'Server error during update', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    const allUsers = await User.find({});
    res.status(200).json({
      message: 'All users fetched successfully',
      users: allUsers,
    });
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    res.status(500).json({
      message: 'Failed to load users',
      error: error.message,
    });
  }
};


exports.deleteAllUsers = async (req, res) => {
  try {
    // Delete all users
    await User.deleteMany({});
    res.status(200).json({
      message: 'All users deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting all users:', error.message);
    res.status(500).json({
      message: 'Failed to delete users',
      error: error.message,
    });
  }
};


exports.getMe = async (req, res) => {
  try {
    console.log("inside getMe");
    console.log(req.user)
    // Find the user by ID, which is available in req.userId from the middleware
    const user = await User.findById(req.user._id).select('-password'); // Exclude the password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Send the user data
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
