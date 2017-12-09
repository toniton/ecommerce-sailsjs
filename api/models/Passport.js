/**
 * Passport.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var Passport = {
    schema: true,
    attributes: {
        protocol: {
            type: 'alphanumeric',
            required: true
        },
        password: {
            type: 'string',
            minLength: 4
        },
        pin: {
            type: 'string',
            minLength: 4,
            maxLength: 4
        },
        provider: {
            type: 'alphanumericdashed'
        },
        identifier: {
            type: 'string'
        },
        tokens: {
            type: 'json'
        },
        accessToken: {
            type: 'string'
        },
        user: {
            model: 'user',
            // required: true
        }
    },

    beforeUpdate: function (values, next) {
        AuthService.hashPassword(values);
        next();
    },

    beforeCreate: function (values, next) {
        AuthService.hashPassword(values);
        next();
    }
};

module.exports = Passport;
