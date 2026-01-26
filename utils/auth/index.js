const passport = require('passport');

//Define and import any type of strategy here
const LocalStrategy = require('./strategies/local.strategy');

passport.use(LocalStrategy);

module.exports = passport;