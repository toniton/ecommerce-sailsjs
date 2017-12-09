/**
 * Passport configuration file where you should configure all your strategies
 * @description :: Configuration file where you configure your passport authentication
 */
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

var SECRET = sails.config.tokenSecret;
var ISSUER = sails.config.jwtSettings.issuer;
var AUDIENCE = sails.config.jwtSettings.audience;

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

/**
 * Configuration object for local strategy
 * @type {Object}
 * @private
 */
var LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
var JWT_STRATEGY_CONFIG = {
    secretOrKey: SECRET,
    issuer: ISSUER,
    audience: AUDIENCE,
    passReqToCallback: false,
    jwtFromRequest: sails.config.passport.jwt.extractJwt.fromAuthHeader()
};

/**
 * Configuration object for social strategies
 * @type {Object}
 * @private
 */
var SOCIAL_STRATEGY_CONFIG = {
    clientID: '-',
    clientSecret: '-',
    consumerKey: '-',
    consumerSecret: '-',
    passReqToCallback: true,
    authorizationURL:'-',
    tokenURL:'-'
};

/**
 * Triggers when user authenticates via local strategy
 * @param {String} email Email from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
function _onLocalStrategyAuth(req, email, password, next) {
    var Model = actionUtil.parseModel(req);
    User.findOne({
            email: email
        }).then(function(user) {
            if(!user){
                return next(null, false, {
                    code: 'E_USER_NOT_FOUND',
                    message: 'User with email '+email + ' is not found'
                });
            }
            if(user.status == 'disabled'){
                return next(null, false, {
                    code: 'E_USER_DISABLED',
                    message: 'This user is disabled, contact admin for authorization.'
                });
            }
            Passport.findOne({
                protocol: 'local',
                user: user.id
            }, function(err, passport) {
                if (!passport) {
                    return next(null, false, {
                        code: 'E_NO_PASSWORD',
                        message: 'Password not set for this account'
                    });
                }
                if (!bcrypt.compareSync(password, passport.password)) {
                    return next(null, false, {
                        code: 'E_INVALID_PASSWORD',
                        message: 'Provided password for  email ' + email + ' is invalid'
                    });
                }
                return next(null, user, {});
            });
        }).catch(function(){
            return next(null, false, {
                code: 'E_USER_NOT_FOUND',
                message: 'Account with email '+email + ' is not found'
            });
        });
}

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
function _onJwtStrategyAuth(payload, next) {
    //sails.log.info('JWT User... ',payload);
    var user = payload.user;
    return next(null, user, {});
}

/**
 * Triggers when user authenticates via one of social strategies
 * @param {Object} req Request object
 * @param {String} accessToken Access token from social network
 * @param {String} refreshToken Refresh token from social network
 * @param {Object} profile Social profile
 * @param {Function} next Callback
 * @private
 */
function _onSocialStrategyAuth(req, accessToken, refreshToken, profile, next) {
    if (!req.user) {
        // TODO: move to ComputedPropertyName ES6
        var criteria = {};
        criteria['socialProfiles.' + profile.provider + '.id'] = profile.id;

        var model = {
            username: profile.username || profile.displayName || '',
            email: (profile.emails[0] && profile.emails[0].value) || '',
            firstName: (profile.name && profile.name.givenName) || '',
            lastName: (profile.name && profile.name.familyName) || '',
            photo: (profile.photos[0] && profile.photos[0].value) || '',
            socialProfiles: {}
        };
        model.socialProfiles[profile.provider] = profile._json;

        User
        // TODO: check if criteria is working
            .findOrCreate(criteria, model)
            .exec(function(error, user) {
                if (error) return next(error, false, {});
                if (!user) return next(null, false, {
                    code: 'E_AUTH_FAILED',
                    message: [profile.provider.charAt(0).toUpperCase(), profile.provider.slice(1), ' auth failed'].join('')
                });
                return next(null, user, {});
            });
    }
    else {
        req.user.socialProfiles[profile.provider] = profile._json;
        req.user.save(next);
    }
}

passport.use(new sails.config.passport.local.strategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(new sails.config.passport.jwt.strategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));
passport.use(new sails.config.passport.facebook.strategy(SOCIAL_STRATEGY_CONFIG, _onSocialStrategyAuth));
