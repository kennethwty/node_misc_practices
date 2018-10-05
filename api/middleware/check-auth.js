const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // the method will return a decoded token if it succeeds
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Failed Auth'
        });
    }
};