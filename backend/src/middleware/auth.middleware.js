const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

/**
 * Protect routes - verify JWT token
 */
const protect = async (req, res, next) => {
    try {
        let token;

        // Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token');
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request
            req.user = await User.findById(decoded.userId);

            if (!req.user) {
                res.status(401);
                throw new Error('User not found');
            }

            next();
        } catch (jwtError) {
            res.status(401);
            throw new Error('Not authorized, token invalid or expired');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { protect };
