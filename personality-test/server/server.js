const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Replace these with your email service provider's credentials
const transporter = nodemailer.createTransport({
    service: 'mailjet',
    auth: {
        user: process.env.MAIL_SERVER_USER,
        pass: process.env.MAIL_SERVER_PASSWORD
    },
});

const verificationCodes = {};

app.post('/sendVerificationCode', (req, res) => {
    const userEmail = req.body.email;

    // Generate a random 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the verification code and timestamp
    verificationCodes[userEmail] = {
        code: verificationCode,
        timestamp: Date.now(),
    };

    // Set up email data with the verification code
    const mailOptions = {
        from: 'no-reply@digitalcareers.academy',
        to: userEmail,
        subject: 'Digital Careers Personality Test Email Verification Code',
        text: `Your verification code is: ${verificationCode}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending verification code.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Verification code sent successfully.');
        }
    });
});

// Endpoint to resend a verification code to a user's email
app.post('/resendVerificationCode', (req, res) => {
    const userEmail = req.body.email;

    // Check if the user's email already has a verification code pending
    if (verificationCodes[userEmail]) {
        // Generate a new verification code
        const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Update the verification code and timestamp
        verificationCodes[userEmail] = {
            code: newVerificationCode,
            timestamp: Date.now(),
        };

        // Set up email data with the new verification code
        const mailOptions = {
            from: 'no-reply@digitalcareers.academy', // Update with your sender email address
            to: userEmail,
            subject: 'Digital Careers Personality Test Email Verification Code (Resend)',
            text: `Your new verification code is: ${newVerificationCode}`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error resending verification code.');
            } else {
                console.log('Resent email: ' + info.response);
                res.status(200).send('New verification code sent successfully.');
            }
        });
    } else {
        res.status(400).send('No pending verification code found for this email.');
    }
});

app.post('/verifyCode', (req, res) => {
    const userEmail = req.body.email;
    const userCode = req.body.code;

    console.log(userCode, userEmail);

    // Check if the verification code exists and is still valid (e.g., within 5 minutes)
    if (verificationCodes[userEmail] && verificationCodes[userEmail].code === userCode) {
        const timestamp = verificationCodes[userEmail].timestamp;
        const currentTime = Date.now();

        // Set an expiration time (e.g., 30 minutes)
        const expirationTime = 30 * 60 * 1000;

        if (currentTime - timestamp <= expirationTime) {
            res.status(200).send('Verification successful!');
        } else {
            res.status(400).send('Verification code has expired. Please request a new one.');
        }
    } else {
        res.status(400).send('Invalid verification code.');
    }
});

// Endpoint to send email to support@digitalcareers.academy
app.post('/sendAdvisorEmail', (req, res) => {
    const { fullName, emailAddress, tiedCourses } = req.body;

    // Set up email data
    const mailOptions = {
        from: 'pt@digitalcareers.academy',
        to: 'support@digitalcareers.academy',
        subject: 'Tied Courses - New Request for a Course Advisor',
        text: `Candidate Details:\n\nFull Name: ${fullName}\nEmail Address: ${emailAddress}\n\nTied Courses:\n${tiedCourses}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email to support.');
        } else {
            console.log('Email sent to support: ' + info.response);
            res.status(200).send('Email sent successfully to support.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});