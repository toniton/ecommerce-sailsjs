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

    port: 1337,
    tokenSecret: "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM",
    defaults: {
        redirecturl:'http://localhost:4200/response',
        gateway_config: {
            // auth: {
            //     apiKey: "tk_0UQ4S7gip19d2EJ6thXf", //api Key
            //     secret: "tk_JHnId1LsVm" //merchant Key or secret
            // }
            
            auth: {
                apiKey: 'lk_EXHVKvcodhuMZNUgbGIj',
                secret: 'lk_f3xgDZsLni'
            }
        }
    },
    jwtSettings: {
        expiresInMinutes: "2 minutes"
    }
};
