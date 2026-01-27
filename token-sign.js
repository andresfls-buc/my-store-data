const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'myCat';
const payload = {
  sub: 1,
 role: 'customer'
};


function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);