const User = require('../models/userModel');
const bcryptjs = require('bcryptjs'); // Change to bcryptjs for consistency
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("../utils/cloudinary"); // Cloudinary utility
const mongoose = require('mongoose'); // Mongoose utility


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
        role: user.role,
        notification:
        {
          id: uuidv4(),
          type: 'security',
          title: 'New login detected',
          message: 'A new login was detected from Chrome on Windows.',
          timestamp: new Date().toISOString(),
          read: false,
          icon: 1
        }
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
  
  console.log("🔹 Received user data:", userData);
  console.log("🔹 Uploaded file:", req.file ? req.file.originalname : "No file uploaded");

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  // Start a transaction session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let user = await User.findById(id).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    let imageUrl = user.profileImage; // Default: Keep the old image if no new one is uploaded

    // If a new file is uploaded, process it with Cloudinary
    if (req.file) {
      try {
        // Delete old image from Cloudinary if it exists
        if (user.profileImage && typeof user.profileImage === "string" && user.profileImage.startsWith("http")) {
          const oldImageId = user.profileImage.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`profile_pictures/${oldImageId}`);
        }
        

        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "profile_pictures",
          use_filename: true,
          unique_filename: false,
          transformation: [{ width: 300, height: 300, crop: "fill" }],
        });

        if (!result || !result.secure_url) {
          throw new Error("Image upload to Cloudinary failed");
        }

        imageUrl = result.secure_url;
        console.log("✅ New image uploaded to Cloudinary:", imageUrl);
      } catch (uploadError) {
        console.error("❌ Cloudinary upload error:", uploadError);
        throw new Error("Failed to upload image. Please try again.");
      }
    }

    // Merge user updates with existing data, preserving old values if new ones are missing
    const updatedUserData = {
      username: userData.username || user.username,
      email: userData.email || user.email,
      phoneNumber: userData.phoneNumber || user.phoneNumber,
      githubUrl: userData.githubUrl || user.githubUrl,
      linkedinUrl: userData.linkedinUrl || user.linkedinUrl,
      instagramUrl: userData.instagramUrl || user.instagramUrl,
      profileImage: imageUrl,
    };

    // Update user details
    user = await User.findByIdAndUpdate(id, updatedUserData, { new: true, session });

    await session.commitTransaction();
    session.endSession();

    console.log("✅ User updated successfully:", user);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("❌ Error during update:", error);
    res.status(500).json({ message: "Server error during update", error: error.message });
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
