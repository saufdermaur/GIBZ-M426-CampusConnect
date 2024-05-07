const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.account = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
};

module.exports = { verifyToken };
