const { verifyToken } = require('../utils/tokenUtils');

exports.authenticate = (req, res, next) => {
    
    const token = req.headers['authorization'];
    const Email = req.headers['user-agent'];

    if (!token) {
        return res.status(401).json({ message: "Access token missing" });
    }

    try {
        const decoded = verifyToken(token, Email);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};
