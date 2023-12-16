```javascript
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKeyPath = path.join(__dirname, '../keys/private.key');
const publicKeyPath = path.join(__dirname, '../keys/public.key');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

const signOptions = {
  expiresIn: '1h',
  algorithm: 'RS256'
};

const verifyOptions = {
  algorithms: ['RS256']
};

const encryptPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const generateToken = (payload) => {
  return jwt.sign(payload, privateKey, signOptions);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, publicKey, verifyOptions);
  } catch (error) {
    return null;
  }
};

const secureEndpoints = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const verified = verifyToken(token.split(' ')[1]);
  if (!verified) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  req.user = verified;
  next();
};

module.exports = {
  encryptPassword,
  generateToken,
  verifyToken,
  secureEndpoints
};
```