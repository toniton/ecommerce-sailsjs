/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '*': {
    controller: 'index',
    action: 'index',
    skipAssets: true,
    skipRegex: /(^\/api\/.*$)|(^\/file\/\w+\/\w+.(pdf|png|jpg|jpeg|mp3|mp4)$)/
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  "POST /api/user": {response: 'forbidden'},

  "GET /api/user/login": {response: 'forbidden'},
  "GET /api/user/login/:id": {response: 'forbidden'},
  "PUT /api/user/login": {response: 'forbidden'},
  "PUT /api/user/login/:id": {response: 'forbidden'},
  "DELETE /api/user/login/:id": {response: 'forbidden'},

  "GET /api/user/signup": {response: 'forbidden'},
  "GET /api/user/signup/:id": {response: 'forbidden'},
  "PUT /api/user/signup": {response: 'forbidden'},
  "PUT /api/user/signup/:id": {response: 'forbidden'},
  "DELETE /api/user/signup/:id": {response: 'forbidden'},


  "GET /api/user/resetpasswordlink": {response: 'forbidden'},
  "GET /api/user/resetpasswordlink/:id": {response: 'forbidden'},
  "PUT /api/user/resetpasswordlink": {response: 'forbidden'},
  "PUT /api/user/resetpasswordlink/:id": {response: 'forbidden'},
  "DELETE /api/user/resetpasswordlink/:id": {response: 'forbidden'},

  "GET /api/user/newpassword": {response: 'forbidden'},
  "GET /api/user/newpassword/:id": {response: 'forbidden'},
  "PUT /api/user/newpassword": {response: 'forbidden'},
  "PUT /api/user/newpassword/:id": {response: 'forbidden'},
  "DELETE /api/user/newpassword/:id": {response: 'forbidden'},

  "GET /api/transaction/response": {response: 'forbidden'},
  "GET /api/transaction/response/:id": {response: 'forbidden'},
  "PUT /api/transaction/response": {response: 'forbidden'},
  "PUT /api/transaction/response/:id": {response: 'forbidden'},
  "DELETE /api/transaction/response/:id": {response: 'forbidden'},

  "GET /api/bankaccount/verify": {response: 'forbidden'},
  "GET /api/bankaccount/verify/:id": {response: 'forbidden'},
  "PUT /api/bankaccount/verify": {response: 'forbidden'},
  "PUT /api/bankaccount/verify/:id": {response: 'forbidden'},
  "DELETE /api/bankaccount/verify/:id": {response: 'forbidden'},

};
