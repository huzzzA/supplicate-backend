const express = require('express');
const {register, login, forgotPassword, resetPassword} = require('../controllers/authController');
const router = express.Router();

// Register route
router.post('/register', register);
// Login route  
router.post('/login', login);
// Forgot password route
router.post('/forgot-password', forgotPassword);
// Reset password route
router.post('/reset-password', resetPassword);

router.get('/login', (req, res) => {
  res.send("Login route is working. Use POST to actually log in.");
});


// Export the router
module.exports = router;
// This code defines the authentication routes for user registration and login.
