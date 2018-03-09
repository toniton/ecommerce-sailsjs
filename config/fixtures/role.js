var Promise = require('bluebird');
/**
 * Creates default Roles
 *
 * @public
 */
exports.create = function () {
  return Promise.all([
    Role.findOrCreate({ name: 'admin' }, { name: 'admin' }),
    Role.findOrCreate({ name: 'user' }, { name: 'user' }),
    Role.findOrCreate({ name: 'customer' }, { name: 'customer' })
  ]);
};
