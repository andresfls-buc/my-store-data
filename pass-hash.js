const bcrypt = require('bcrypt');

async function hashPassword(){
 // Password to be hashed   
const myPassword = 'admin 123 .202';
// Hashing the password with a salt rounds of 10
const hash = await bcrypt.hash(myPassword, 10);
console.log(hash);
}

hashPassword();

