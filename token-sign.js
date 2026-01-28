const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'myCat';
const payload = {
  sub: user.id,
 role: user.role
};


function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);