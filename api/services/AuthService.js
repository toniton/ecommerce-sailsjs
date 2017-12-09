/**
 * Created by Toni on 11/9/2016.
 */

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
    hashPassword: function (passport) {
        if (passport.password) {
            passport.password = bcrypt.hashSync(passport.password);
        }
    },

    comparePassword: function (password, passport) {
        return bcrypt.compareSync(password, passport.password);
    },

    createToken: function (model) {
        return "JWT " + jwt.sign({
            user: model.toJSON()
        },
            sails.config.tokenSecret,
            {
                algorithm: sails.config.jwtSettings.algorithm,
                expiresIn: sails.config.jwtSettings.expiresInMinutes,
                issuer: sails.config.jwtSettings.issuer,
                audience: sails.config.jwtSettings.audience
            }
        );
    },

    assignRole: function (userId, roleName) {
        var promise = new Promise(function (resolve, reject) {
            User.findOne({id: userId }).then(function (user) {
                Role.findOne({name: roleName }).then(function (role) {
                    user.roles.add(role);
                    user.save();
                    resolve(user);
                }).catch(function(err){
                    reject(err);
                });
            }).catch(function(err){
                reject(err);
            });
        });
        return promise;
    },

    createPassport: function (user, password) {
        var token = new Buffer('secured@: ' + new Date()).toString('base64');
        return Passport.create({
            protocol: 'local',
            password: password,
            user: user,
            accessToken: token
        });
    },

    generatePassport: function (password) {
        var token = new Buffer('secured@: ' + new Date()).toString('base64');
        return {
            protocol: 'local',
            password: password,
            accessToken: token
        };
    },

    updatePassport: function (id, password) {
        return Passport.update(
            {
                protocol: 'local',
                user: id
            },
            {
                password: password
            }
        );
    }
};

