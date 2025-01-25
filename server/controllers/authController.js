const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
    const { username, password, name, email } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
  
      // Create a new user
      const newUser = new User({
        username,
        password,
        name,
        email,
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      const errorMessages = error.errors
        ? Object.values(error.errors).map((err) => err.message)
        : ["An unexpected error occurred"];
      res.status(500).json({ err: "Error registering user", error: errorMessages });
    }
  };
  

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Validate that email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Ensure user.password exists before comparing
      if (!user.password) {
        return res.status(500).json({ error: "User password is missing in the database" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user and include the password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Error logging in" });
  }
};

  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error in login function:", error.message);
      res.status(500).json({ error: "Error logging in" });
    }
  };
  exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Find user and include the password field
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error.message);
      res.status(500).json({ error: "Error logging in" });
    }
  };
  

  exports.deleteAllUsers = async (req, res) => {
    try {
      // Delete all users
      await User.deleteMany({});
      res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
      console.error("Error deleting all users:", error.message);
      res.status(500).json({ error: "Failed to delete users" });
    }
  };
  

  
  exports.getAllUSers = async (req, res) => {
    try {
     const allUservv= await User.find({});
      res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
      console.error("Error fetching all users:", error.message);
      res.status(500).json({ error: "Failed to load users" });
    }
  };