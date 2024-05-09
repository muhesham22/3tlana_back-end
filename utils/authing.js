const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(403).json({ error: 'missing token' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'superprivatekey');
    } catch (error) {
        return res.status(403).json({ error: 'token invalid authorization failed' });
    }
    if (!decodedToken) {
        return res.status(401).json({ error: 'authentication failed' });
    }
    req.userId = decodedToken.userId;
    next();
};