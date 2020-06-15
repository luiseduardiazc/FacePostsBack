
const jwt = require('jsonwebtoken');
const config = require('../../config');

async function verifyToken (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'authorization header no provided' });
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided' });
  }

  try {
    const decoded = await jwt.verify(token, config.server.SECRET_KEY);
    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).send({ message: 'Token expired' });
  }

  next();
}

module.exports = verifyToken;
