const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const emailService = require('../backend/services/emailService'); // Add email service
const didRoutes = require('./routes/didRoutes');
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);
// Security Middleware
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 ,// limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
//app.use('/api/', limiter);

// CORS configuration
app.use(cors({
    origin:  'http://192.168.1.61:8081',
    credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    // Initialize email service after DB connection
    return emailService.transporter.verify();
})
.then(() => {
    console.log('Email service initialized successfully');
})
.catch(err => {
    console.error('Initialization error:', err);
    process.exit(1);
});

// Routes
app.use('/api/authMiddleware', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/network', require('./routes/networkRoutes'));
app.use('/api/credential', require('./routes/credentialRoutes'));
app.use('/api/connection', require('./routes/connectionRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/email', require('./routes/authRoutes')); // Add email routes if needed
app.use('/api/did', didRoutes);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

const PORT = process.env.PORT;
// const server = app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        mongoose.connection.close(false, () => {
            process.exit(0);
        });
    });
});

module.exports = app;