global._ = require('lodash');

module.exports.defaults = {
    hostname: 'https://paytron.com.ng',//'http://localhost:4200',
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
            pass: 'tofunmi18@stlouis'
            // user: 'akinjiolatoni@gmail.com',
            // pass: 'C0c@c0l@'
        },
        logger: true
    },
    paga: {
        apiKey: 'fe5bf404-4085-4d8f-ac00-ff8cc67ea718',
        principal: '8B856153-7EA1-4A85-B26D-33D5EA201C0D',
        credentials: 'password1',
        endpoints:{
            validatePayMerchant: 'https://qa1.mypaga.com/paga-webservices/agent-rest/secured/validatePayMerchant',
            payMerchant: 'https://qa1.mypaga.com/paga-webservices/agent-rest/secured/payMerchant'
        }
    }
};
