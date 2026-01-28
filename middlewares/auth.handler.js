const boom =  require('@hapi/boom');

const {config } = require('../config/config');

function checkApiKey(req , res, next){
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey){
        next();
    } else {
        next(boom.unauthorized());
    }
}

function checkAdminRole(req, res, next) {
    console.log(req.user);
    const user = req.user;
    if (user && user.role === 'admin') {
        next();
    } else {
        next(boom.forbidden('You do not have permission to perform this action'));
    }
}

function checkRoles(...roles) {
  // Returns a middleware function that checks if the user has any of the specified roles
    return(req , res, next) => {
          console.log(req.user);
    const user = req.user;
    if (user && roles.includes(user.role)) {
        next();
    } else {
        next(boom.forbidden('You do not have permission to perform this action'));
    }
    };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };