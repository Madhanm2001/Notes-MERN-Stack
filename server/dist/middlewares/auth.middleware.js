"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jwt_1 = require("../utils/jwt");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        if (decoded) {
            req.user = decoded;
            next();
        }
        else {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
    else {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
};
exports.authenticateJWT = authenticateJWT;
