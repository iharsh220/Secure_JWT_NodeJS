const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

exports.generateToken = (userId, Email) => {
    const payload = {
        userId,
        emailHash: hashEmail(Email),
    };
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

exports.verifyToken = (token, Email) => {
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);

        if (decoded.emailHash !== hashEmail(Email)) {
            throw new Error("Token not valid for this user agent");
        }
        return decoded;
    } catch (err) {
        throw new Error("Invalid token");
    }
};

function hashEmail(Email) {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(Email).digest('hex');
}
