const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const emailService = require('../services/emailService');

// Send OTP
router.post('/send-otp', async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;
        console.log("🚀 ~ router.post ~ req.body:", req.body)
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        console.log("🚀 ~ router.post ~ existingUser:", existingUser)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("🚀 ~ router.post ~ otp:", otp)
        
        // Store OTP temporarily
        const user = new User({
            email,
            firstName,
            lastName,
            otp: {
                code: otp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
            }
        });
        await user.save();

        // Send OTP via email service
        await emailService.sendEmail({
            to: email,
            subject: 'Your OTP Code',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Your OTP Code</h2>
                    <p>Hello ${firstName},</p>
                    <p>Your OTP code is: <strong>${otp}</strong></p>
                    <p>This code will expire in 10 minutes.</p>
                </div>
            `
        });
        
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('OTP send error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
    

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        
        user.password = password;
        user.otp = undefined;
        await user.save();

        // Send welcome email
        await emailService.sendWelcomeEmail(email, user.firstName);

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            userId: user._id
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Compare the provided password with the stored password
//         const isMatch = password === user.password; // Direct comparison (not recommended for production)
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // If passwords match, return success response
//         res.json({
//             message: 'Login successful',
//             userId: user._id
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
// Password Reset Request
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        await emailService.sendPasswordReset(email, resetToken);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Password reset request error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;