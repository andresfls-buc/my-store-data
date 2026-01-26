const bcrypt = require('bcrypt');

async function verifyPassword(){
 // Password to be hashed   
const myPassword = 'admin 123 .202';
const hash = '$2b$10$OMTZmfqDgULELfiuD4Mb7O2tQ08oxCdKd5NAaZPHP3txMBG1SkaDG';
// Verifying the password against the hash
const isMatch = await bcrypt.compare(myPassword, hash);
console.log(isMatch);
}

verifyPassword();

