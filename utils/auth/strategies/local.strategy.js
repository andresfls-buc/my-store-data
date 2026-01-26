const { Strategy }= require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('./../../../services/user.service');
const service = new UserService();


const LocalStrategy = new Strategy( {
    // Call the username field 'email' instead of 'username'
    usernameField: 'email',
    passwordField: 'password',
}, 
async (email, password, done) => {
   try {
    const user = await service.findByEmail(email);
    if (!user) {
       return done(boom.unauthorized(), false);

    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return done(boom.unauthorized(), false);
    }
    // Remove password field before returning user object
    delete user.dataValues.password;
     
    done(null, user);
   } catch (error) {
    done(error, false);
   }
});

module.exports = LocalStrategy;