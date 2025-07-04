// auth.middleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("From auth", req.user);
        
        next();
    } catch (error) {
        res.status(403).send({ error: 'Invalid or expired token.' });
    }
};
 
module.exports = {authenticateToken};