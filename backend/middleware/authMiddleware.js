const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log("🚀 ~ token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🚀 ~ decoded:", decoded);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication required' });
    }
};
