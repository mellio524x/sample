// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const nodemailer = require('nodemailer');

// Registration endpoint
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();

    // Send a registration confirmation email
    sendConfirmationEmail(email);

    res.json({ success: true, user: savedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Function to send a confirmation email
function sendConfirmationEmail(userEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'heyjonwhatsurname@gmail.com', // Replace with your Gmail email
      pass: 'Katie1990.', // Replace with your Gmail password
    },
  });

  const mailOptions = {
    from: 'heyjonwhatsurname@gmail.com', // Replace with your Gmail email
    to: userEmail,
    subject: 'Registration Confirmation',
    text: 'Thank you for registering on our platform!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// ... other endpoints ...

module.exports = router;
