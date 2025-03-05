const User = require("../models/userModel")
const Event = require("../models/eventModel");


exports.searchUser = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');  
    const username = req.params.username;
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(404).json({ message: "User not found. please try again" })
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getAllUsers = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    try {
        const users = await User.find()
        console.log(users)
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

