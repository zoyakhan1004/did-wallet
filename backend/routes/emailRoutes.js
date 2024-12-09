// const express = require('express');
// const emailService = require('../services/emailService');

// const router = express.Router();

// router.post('/send-test-email', async (req, res) => {
//     try {
//         const { to, subject, html } = req.body;
//         console.log("🚀 ~ router.post ~ req.body:", req.body)
        
//         // Validate input
//         if (!to || !subject || !html) {
//             return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
//         }

//         await emailService.sendEmail({
//             to,
//             subject,
//             html
//         });

//         res.status(200).json({ message: 'Test email sent successfully' });
//     } catch (error) {
//         console.error('Error sending test email:', error);
//         res.status(500).json({ error: 'Failed to send test email' });
//     }
// });

// module.exports = router;