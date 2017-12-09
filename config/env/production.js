/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    models: {
        connection: 'MongodbServerProduction',
        migrate: 'safe'
    },

    /***************************************************************************
     * Set the port in the production environment to 80                        *
     ***************************************************************************/

    // port: 80,

    /***************************************************************************
     * Set the log level in production environment to "silent"                 *
     ***************************************************************************/

    // log: {
    //   level: "silent"
    // }

    hookTimeout: 1200000,
    port: 8081,
    tokenSecret: "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM",
    ssl: {
        ca: require('fs').readFileSync(require('path').resolve(__dirname, '../ssl/paytron_com_ng.ca-bundle')),
        key: require('fs').readFileSync(require('path').resolve(__dirname, '../ssl/paytron_com_ng.key')),
        cert: require('fs').readFileSync(require('path').resolve(__dirname, '../ssl/paytron_com_ng.crt'))
    },
    defaults: {
        redirecturl: 'https://paytron.com.ng/response',
        gateway_config: {
            auth: {
                apiKey: 'lk_EXHVKvcodhuMZNUgbGIj',
                secret: 'lk_f3xgDZsLni'
            }
        },
        mail_config: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'hello@paytron.com.ng',
                pass: 'tofunmi18@stlouis'
            },
            logger: true
        },
        paga: {
            apiKey: '1d7d467a38a84b5c8bbd75955046d21aadcf409756c04de8a2e03426ac614df297996f7ced8d4396bdd5685a150297bb9ec50f73786e49f4a197233f973efe68',
            principal: 'EE533714-BCBB-4DCC-94A4-6B8A5F0EA3EE',
            credentials: 'pD4#PAxefk=2',
            endpoints:{
                validatePayMerchant: 'https://mypaga.com/paga-webservices/agent-rest/secured/validatePayMerchant',
                payMerchant: 'https://mypaga.com/paga-webservices/agent-rest/secured/payMerchant'
            }
        }
    },
    jwtSettings: {
        expiresInMinutes: "25 minutes"
    }
};
