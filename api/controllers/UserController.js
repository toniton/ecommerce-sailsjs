/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var nodemailer = require('nodemailer');
var transport = sails.config.defaults.mail_config;

module.exports = {
    login: function (req, res) {
        req.validate({
            email: "string",
            password: "string"
        });
        passport.authenticate('local', function (error, model, info) {
            if (error) {
                return res.serverError(error);
            }
            if (!model) {
                return res.forbidden(null, info && info.code, info && info.message);
            }
            req.session.authenticated = true;
            return res.ok({
                token: AuthService.createToken(model),
                uid: model.id
            });
        })(req, res);
    },

    signup: function (req, res) {
        req.validate({
            firstname: "string",
            lastname: "string",
            phone: "string",
            email: "string",
            password: "string"
        });
        var reqData = actionUtil.parseValues(req);
        User.create(reqData).exec(function (err, user) {
            if (err) {
                return res.forbidden(err, null, "Error occurred while trying to set up an account for you.");
            }
            if (reqData.password) {
                user.passports.add(AuthService.generatePassport(reqData.password));
                user.save();
            }
            req.session.authenticated = true;
            return res.ok(user);
        });
    },

    resetPasswordLink: function (req, res) {
        req.validate({
            email: "string"
        });
        var reqData = actionUtil.parseValues(req);
        reqData.email = reqData.email;
        User.findOne({ email: reqData.email }).exec(function (err, data) {
            if (err || !data) {
                return res.forbidden(err);
            }
            ResetPassword.create({ email: reqData.email }).then(function (resetPassword) {
                EmailService.sendPasswordResetLink(resetPassword.email, resetPassword.hash);
                return res.ok(resetPassword);
            });
        });
    },

    newPassword: function (req, res) {
        req.validate({
            email: "string",
            hash: "string",
            password: "string"
        });
        var reqData = actionUtil.parseValues(req);
        reqData.email = reqData.email;
        ResetPassword.findOne({ email: reqData.email, hash: reqData.hash }).exec(function (err, resetPassword) {
            if (err || !resetPassword) {
                return res.forbidden(err);
            }
            User.findOne({ email: reqData.email }).exec(function (err, user) {
                if (err) {
                    return res.forbidden(err);
                }
                AuthService.updatePassport(user.id, reqData.password).then(function () {
                    return res.ok();
                }).catch(function () {
                    return res.forbidden(err);
                });
            });
        });
    }
};

