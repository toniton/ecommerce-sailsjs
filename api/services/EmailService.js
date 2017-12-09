/**
 * Created by Toni on 11/9/2016.
 */

var Hashids = require('hashids');
var nodemailer = require('nodemailer');
var passport = require('passport');
var transport = sails.config.defaults.mail_config;

module.exports = {
    welcome: function (model) {
        var transporter = nodemailer.createTransport(transport);
        return User.findOne({ id: model.id }).then(function (user) {
            sails.renderView('email/signup/user', { layout: 'user' }, function (err, view) {
                if (err) {
                    sails.log(err);
                    return false;
                }
                var accountCreatedEmail = view.replace(/@username@/g, user.firstname)
                        .replace(/@email@/g, user.email);;
                transporter.sendMail({
                    from: 'paytron',
                    to: user.email,
                    subject: 'We’re excited you’ve joined us',
                    html: accountCreatedEmail
                });
            });
        });
    },
    sendPasswordResetLink: function (email, hash) {
        var transporter = nodemailer.createTransport(transport);
        sails.renderView('email/signup/resetlink', { layout: 'resetlink' }, function (err, view) {
            if (err) {
                sails.log(err);
                return false;
            }
            var accountCreatedEmail = view.replace(/@resetlink@/g, sails.config.defaults.hostname + '/newpassword?email=' + email + '&hash=' + hash)
                .replace(/@email@/g, email);
            transporter.sendMail({
                from: 'Paytron',
                to: email,
                subject: 'Your password reset link',
                html: accountCreatedEmail
            });
        });
    },
    sendPawaToken: function (data) {
        var transporter = nodemailer.createTransport(transport);
        sails.renderView('email/pawa/pawatoken', { layout: 'pawatoken' }, function (err, view) {
            if (err) {
                return false;
            }
            var tokenResponseEmail = view.replace(/@pawatoken@/g, data.token)
            .replace(/@email@/g, data.email)
            .replace(/@currency@/g, data.currency)
            .replace(/@vat@/g, data.vat)
            .replace(/@paymentReference@/g, data.paymentReference)
            .replace(/@phone@/g, data.phone)
            .replace(/@billerId@/g, data.billerId)
            .replace(/@transactionReference@/g, data.transactionReference)
            .replace(/@total@/g, data.total)
            .replace(/@meterNumber@/g, data.meterNumber);
            transporter.sendMail({
                from: 'Paytron',
                to: data.email,
                subject: ''.concat('Your Pawa Reharge Token [', data.transactionReference, ']'),
                html: tokenResponseEmail
            });
        });
    },
};

