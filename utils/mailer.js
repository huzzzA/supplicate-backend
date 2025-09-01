const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetEmail = async (to, token) => {
  const resetUrl = `exp://192.168.0.150:8081/--/reset-password?token=${token}`;
  

  try {
    const { data } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    console.log('Reset email sent successfully!', data);
  } catch (err) {
    console.error('Error sending reset email:', err);
  }
};

module.exports = { sendResetEmail };
