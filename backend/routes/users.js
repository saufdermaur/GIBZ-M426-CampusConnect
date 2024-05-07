const express = require('express');
const { isAdmin, isTeacher, canCreateUser } = require('../middleware/roleChecks');
const { verifyToken } = require('../middleware/auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { Email, PasswordHash } = req.body;
    try {
        const user = await User.findOne({ where: { Email } });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(PasswordHash, user.PasswordHash);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }
        if (user.InitPassword) {
            return res.status(403).send({ message: "Please reset your password", forceReset: true });
        }

        const token = jwt.sign(
            { userId: user.UserID, role: user.RoleID },
            'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.status(200).send('Login successful');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/change-password', verifyToken, async (req, res) => {
    const { UserID, oldPassword, newPassword } = req.body;
    try {
        const user = await User.findByPk(UserID);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(oldPassword, user.PasswordHash);
        if (!isMatch) {
            return res.status(401).send('Old password does not match');
        }
        user.PasswordHash = newPassword;
        await user.save();
        res.status(200).send('Password successfully updated');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/create-user', [verifyToken, canCreateUser], async (req, res) => {
    const { FirstName, LastName, Email, RoleID, PasswordHash } = req.body;
    try {
        const newUser = await User.create({
            FirstName,
            LastName,
            Email,
            RoleID,
            PasswordHash,
        });
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
