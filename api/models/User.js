/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    attributes: {
        firstname: {
            type: 'string',
            required: true
        },
        lastname: {
            type: 'string',
            required: true
        },
        phone: {
            type: 'string',
            required: true,
            unique: true,
            maxLength:14
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            email:true
        },
        accessToken: {
            type: 'string',
            unique: true
        },
        passports: {
            collection: 'Passport',
            via: 'user'
        },
        roles: {
            collection: 'Role',
            via: 'users',
            dominant: true
        },
        status: {
            enum: ['active', 'disabled'], 
            defaultsTo: 'active' 
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.passports;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    },
    afterCreate: function (values, cb) {
        values.identity = 'User';
        Promise.all([
            AuthService.assignRole(values.id, 'user'),
            EmailService.welcome(values)
        ]).then(function (result) {
            cb();
        }).catch(function(error){
            sails.log.error(error);
            cb(null);
        });
    }
};