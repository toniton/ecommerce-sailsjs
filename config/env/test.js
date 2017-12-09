/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    // models: {
    //   connection: 'someMongodbServer'
    // }

    connections: {
        testDB: {
            adapter: 'sails-memory'
        }
    },
    models: {
        connection: 'testDB'
    },
    tokenSecret: "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM",
    defaults: {
        gateway_config: {
            hostname: 'moneywave.herokuapp.com',
            port: 443,
            auth: {
                apiKey: "ts_31LWTEIKWECN1SLJ2VJO",
                secret: "ts_MCDSLEL7R9UBI8N0B9LUXLBN4SXC6R"
            }
        },
        hostname: 'http://localhost:4200',
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
                user: 'akinjiolatoni@gmail.com',
                pass: ''
            },
            logger: true
        }
    },
    policies: {
        '*': [],
        'TransactionController': [],
        'BankAccountController':[]
    }
};
