const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc2OTQ5MzA1MX0.F9ggruFh24Y2XXL-eKzjNw_RhMdch2_EIL096VecVfs'



function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);