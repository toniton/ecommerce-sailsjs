global._ = require('lodash');

module.exports.defaults = {
    email: process.env.DEFAULT_EMAIL || 'admin@email.com',
    password: process.env.DEFAULT_PASSWORD || 'admin1234',
    afterEvent: [],
    _hookTimeout: 60000,
    allowUnknownModelDefinitions: false,
    mail_config: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'hello@paytron.com.ng',
            pass: ''
        },
        logger: true
    }
};
