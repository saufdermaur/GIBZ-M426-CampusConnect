const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Account } = require('../models/account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

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

// Delete account
router.delete('/delete-account', verifyToken, async (req, res) => {
    const { accountId } = req.account;
    try {
        const account = await Account.findByPk(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        await account.destroy();
        res.status(200).json({ message: 'Account successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get account information
router.get('/account-info', verifyToken, async (req, res) => {
    const { accountId } = req.account;
    try {
        const account = await Account.findByPk(accountId, {
            attributes: ['FirstName', 'LastName', 'Email']
        });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Change email endpoint
router.post('/change-email', verifyToken, async (req, res) => {
    const { accountId, newEmail } = req.body;
    try {
        const account = await Account.findByPk(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        if (!newEmail || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const existingAccount = await Account.findOne({ where: { Email: newEmail } });
        if (existingAccount) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        account.Email = newEmail;
        await account.save();
        res.status(200).json({ message: 'Email successfully updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Change first name
router.patch('/change-first-name', verifyToken, async (req, res) => {
    const { accountId, firstName } = req.body;
    try {
        const account = await Account.findByPk(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        account.FirstName = firstName;
        await account.save();
        res.status(200).json({ message: 'First name updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Change last name
router.patch('/change-last-name', verifyToken, async (req, res) => {
    const { accountId, lastName } = req.body;
    try {
        const account = await Account.findByPk(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        account.LastName = lastName;
        await account.save();
        res.status(200).json({ message: 'Last name updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
