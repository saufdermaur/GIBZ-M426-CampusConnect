const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Account } = require('../models/account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await Account.findOne({ where: { Email: email } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const isMatch = await bcrypt.compare(password, account.PasswordHash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { accountId: account.AccountID },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Change password endpoint
router.post('/change-password', verifyToken, async (req, res) => {
    const { accountId, oldPassword, newPassword } = req.body;
    try {
        const account = await Account.findByPk(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, account.PasswordHash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Old password does not match' });
        }

        account.PasswordHash = newPassword;
        await account.save();
        res.status(200).json({ message: 'Password successfully updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create account endpoint
router.post('/create-account', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const newAccount = await Account.create({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PasswordHash: password,
        });
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
