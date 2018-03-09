/**
 * Created by Toni on 11/9/2016.
 */

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

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

    assignRole: function (_model, roleName) {
        var Model = sails.models[_model.identity];
        return Promise.all([
            Model.findOne({ id: _model.id }),
            Role.findOne({ name: roleName })
        ]).spread((model, role) => {
            model.roles.add(role.id);
            model.save();
        }).catch((err) => reject(err));
    },

    setCreatedBy: function (model) {
        var Model = sails.models[model.identity];
        var promise = new Promise((resolve, reject) => {
            if (sails.config.models.autoCreatedBy !== true) {
                resolve();
            }
            Model.findOne({ id: model.id })
                .then((model) => {
                    model.createdBy = model.id;
                    model.owner = model.id;
                    model.save();
                    resolve(model);
                }).catch((err) => reject(err));
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

