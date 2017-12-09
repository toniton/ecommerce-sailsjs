/**
 * @module ResetPassword
 *
 * @description
 *   Abstract representation of a Waterline Model.
 */

var moment = require("moment");

module.exports = {
  autoPK: true,
  autoCreatedBy: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    hash: {
      type: 'string',
      notNull: true,
      required: true
    },
    email: {
      type: 'email',
      required: true,
    },
    expires: {
      type: 'datetime',
      required: true
    }
  },
  beforeValidate: function (values, cb) {
    HashService.generate(16, function (hash) {
      values.hash = hash;
      cb();
    });
    values.expires = moment().add(3, 'days').format();
  }
};
