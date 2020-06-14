
const jwt = require('jsonwebtoken');
const config = require('../../config');

async function verifyToken(req, res, next) {
    
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Autorization header no provided' })
      }
    
    const token = req.headers.authorization.split(' ')[1]
    
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }

    const decoded = await jwt.verify(token, config.server.SECRET_KEY);
    console.log(decoded)
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;