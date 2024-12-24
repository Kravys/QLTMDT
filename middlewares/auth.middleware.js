const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    console.log('Authorization Header:', req.headers.authorization);
    console.log('Headers:', req.headers); 
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticate };
