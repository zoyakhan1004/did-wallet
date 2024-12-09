const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendEmail(options) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: options.to,
                subject: options.subject,
                html: options.html
            };

            const info = await this.transporter.sendMail(mailOptions);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('Email sending failed:', error);
            throw new Error('Failed to send email');
        }
    }

    async sendPasswordReset(email, resetToken) {
        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        
        return this.sendEmail({
            to: email,
            subject: 'Password Reset Request',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>You requested a password reset. Click the button below to reset your password:</p>
                    <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p>If you didn't request this, please ignore this email.</p>
                    <p>This link will expire in 1 hour.</p>
                </div>
            `
        });
    }

    async sendWelcomeEmail(email, name) {
        return this.sendEmail({
            to: email,
            subject: 'Welcome to Our Platform',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Welcome ${name}!</h2>
                    <p>Thank you for joining our platform. We're excited to have you on board!</p>
                    <p>If you have any questions, feel free to contact our support team.</p>
                </div>
            `
        });
    }

    async sendVerificationEmail(email, verificationToken) {
        const verificationURL = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        
        return this.sendEmail({
            to: email,
            subject: 'Verify Your Email',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Email Verification</h2>
                    <p>Please verify your email address by clicking the button below:</p>
                    <a href="${verificationURL}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                    <p>If you didn't create an account, please ignore this email.</p>
                </div>
            `
        });
    }
}

module.exports = new EmailService();