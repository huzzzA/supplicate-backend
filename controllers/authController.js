const pool = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { sendResetEmail } = require('../utils/mailer');

// Register a new user
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
        
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'User registration failed' });
        };

        if (error.code === '23505') {
            return res.status(400).json({ error: 'Email already exists' });
        }


        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: result.rows[0]
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).json({ error: 'Error registering' });
    }
};

// Login a user

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT id, name, email, password FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) {
            return res.status(401).json({ error: 'Invalid user' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Login Failed' });
    }
};

// Forgot password 
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        setLoad(true);
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '15m', // Token valid for 15 minutes
        });

        await sendResetEmail(email, token);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ error: 'Failed to send password reset email' });
        setLoad(false);
    }
};


const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE id = $2 RETURNING *', [hashedPassword, userId]);
        
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'Password reset failed' });
        }

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
}




module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};