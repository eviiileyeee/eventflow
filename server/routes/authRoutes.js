const express = require('express');
const { register, login , getMe , uploadDetails ,getAllUsers , handleGoogleAuth } = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const passport = require("passport");
require("../config/passport");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put("/uploadDetails/:id", upload.single("profileImage"), protect, uploadDetails);
router.get('/me', protect, getMe);
router.get('/getAllUsers', getAllUsers)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/users/google/success",  // Redirect on success
    failureRedirect: "/api/users/google/failure",  // Redirect on failure
  })
);

// Handle success redirect
router.get("/google/success", (req, res) => {
  res.json({ message: "Google authentication successful!", user: req.user });
});

// Handle failure redirect
router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
});

module.exports = router;
