const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { username, password , name , email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword , name, email });
    try {
       const checkUser = User.find({ username,email });
       if(checkUser){
        return res.status(400).json({ message: "User already exists" });
       }
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        const errorMessages = Object.values(error.errors)?.map((error) => error.message);
        res.status(500).json({ err: 'Error registering user', error: errorMessages });
    }
};

// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;
        
    try {
        console.log(username)
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};
