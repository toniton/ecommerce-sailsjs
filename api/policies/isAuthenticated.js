/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

var passport = require('passport');

module.exports = function (req, res, next) {
    passport.authenticate('jwt', function (error, user, info) {
        if (error) {
            return res.serverError(error);
        }
        if (!user) {
            return res.unauthorized(null, error, 'User  not authenticated. Make sure JWT is prefixed in authorization');
        }
        req.user = user;
        next();
    })(req, res);
};
