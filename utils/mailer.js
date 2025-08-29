const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = async (to, token) => {
    const resetUrl = `exp://192.168.0.150:8081/--/reset-password?token=${token}`;

    await transporter.sendMail({
        from: `"Supplicate" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Password Reset Request',
        html: `
            <h1>Password Reset Request</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
    })

}

module.exports = {
    sendResetEmail,
};