/**
 * Create admin user.
 * @param adminRole - the admin role which grants all permissions
 */
exports.create = function (roles) {
    if (_.isEmpty(sails.config.defaults.email)) {
        throw new Error('Set default email in sails.config.defaults.email!');
    }
    if (_.isEmpty(sails.config.defaults.password)) {
        throw new Error('Set default password in sails.config.defaults.password!');
    }
    return User.findOne({
            email: sails.config.defaults.email
        })
        .then(function (user) {
            if (user) {
                return user;
            }
            sails.log.info('Creating admin account...');
            return User.create({
                firstname:'Chief',
                lastname:'Admin',
                phone:'00000000000',
                email: sails.config.defaults.email,
                status: 'active'
            }).then(function (user) {
                sails.log.info('Adding admin role to account...');
                user.roles.add(_.find(roles, {name: 'admin'}).id);
                user.save();
                return AuthService.createPassport(user.id,sails.config.defaults.password)
                .then(function () {
                    sails.log.info('Securing admin account with password...');
                    return user;
                });
            });
        });
};
