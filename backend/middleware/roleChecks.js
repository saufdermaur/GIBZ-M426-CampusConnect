const { User } = require('../models');

const isTeacher = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.userId);
        const role = await user.getRole();
        if (role && role.Name === 'teacher') {
            next();
        } else {
            res.status(403).send('Access denied');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.userId);
        const role = await user.getRole();
        if (role && role.Name === 'admin') {
            next();
        } else {
            res.status(403).send('Access denied');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

async function canCreateUser(req, res, next) {
    try {
        const user = await User.findByPk(req.user.userId);
        const role = await user.getRole();

        if (role.Name === 'admin') {
            return next();
        }

        if (role.Name === 'teacher' && req.body.RoleID === 'student') {
            return next();
        }

        return res.status(403).send('You do not have permission to perform this operation');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = { isTeacher, isAdmin, canCreateUser };
