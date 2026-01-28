const passport = require('passport');

//Define and import any type of strategy here
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

//Use the strategy
passport.use(JwtStrategy);

passport.use(LocalStrategy);

module.exports = passport;