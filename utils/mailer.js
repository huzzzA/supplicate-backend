const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

const sendResetEmail = async (to, token) => {
    const resetUrl = `supplicate://reset-password?token=${token}`;

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