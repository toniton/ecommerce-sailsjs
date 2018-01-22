/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var CronJob = require('cron').CronJob;

module.exports.bootstrap = function (cb) {
  try {
    new CronJob('10 3 * * * *', function () {
      // sails.controllers.disburse.autoDisburse(sails.request, sails.response, sails.next, function (err, data) {
      //   sails.log.debug(err, "err");
      // });
    }, null, true);
  } catch (ex) {
    sails.log.warn(ex, "cron pattern not valid");
  }
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
