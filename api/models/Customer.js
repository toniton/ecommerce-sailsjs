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
            via: 'customer'
        },
        roles: {
            collection: 'Role',
            via: 'customers',
            dominant: true
        },
        status: {
            enum: ['active', 'disabled'], 
            defaultsTo: 'active' 
        },
        createdBy: {
            model: 'Customer',
            index: true
        },
        owner: {
            model: 'Customer',
            index: true
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.passports;
            delete obj.createdAt;
            delete obj.updatedAt;
            delete obj.owner;
            return obj;
        }
    },
    afterCreate: function (values, cb) {
        values.identity = 'customer';
        Promise.all([
            AuthService.assignRole(values, 'customer'),
            AuthService.setCreatedBy(values),
            EmailService.welcome(values)
        ]).then(() => cb())
        .catch(() => cb(null));
    }
};