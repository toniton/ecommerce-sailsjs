var permissionPolicies = [
    'sessionAuth',
    'ModelPolicy',
    'OwnerPolicy',
    'PermissionPolicy',
    'RolePolicy'
];

module.exports = function (sails) {
    return {
        identity: 'permissions',

        /**
         * Local cache of Model name -> id mappings to avoid excessive database lookups.
         */
        _modelCache: {},

        configure: function () {
            if (!_.isObject(sails.config.permissions)) sails.config.permissions = {};

            sails.config.blueprints.populate = false;
        },

        initialize: function (next) {
            sails.log.info('Initializing permissions...');
            if (!validatePolicyConfig(sails)) {
                sails.log.error('One or more required policies are missing.');
                return sails.lower();
            }

            sails.after(sails.config.permissions.afterEvent, () => {
                installModelOwnership(sails);
            });

            sails.after('hook:orm:loaded', () => {
                Model.count()
                    .then((count) => {
                        if (count == sails.models.length) {
                            return next();
                        }
                        return initializeFixtures(sails).then(() => {
                            sails.emit('hook:permissions:loaded');
                            next();
                        });
                    }).catch((error) => {
                        sails.log.error(error);
                        next(error);
                    });
            });
        }
    };
};

/**
 * Install the application. Sets up default Roles, Users, Models, and
 * Permissions, and creates an admin user.
 */
function initializeFixtures(sails) {
    return require('../../config/fixtures/model').createModels()
        .bind({}).then((_models) => {
            this.models = _models;
            sails.hooks['permissions']._modelCache = _.indexBy(_models, 'identity');
            return require('../../config/fixtures/role').create();
        }).then((roles) => {
            this.roles = roles;
            return require('../../config/fixtures/admin').create(this.roles);
        }).then((admin) => {
            return require('../../config/fixtures/permission').create(this.roles, this.models, admin);
        }).catch((error) => {
            sails.log.warn(error);
        });
}

function installModelOwnership(sails) {
    var models = sails.models;
    if (sails.config.models.autoCreatedBy === false) return;
    _.each(models, (model) => {
        if (model.autoCreatedBy === false) return;
        _.defaults(model.attributes, {
            createdBy: {
                model: 'User',
                index: true
            }
        });
    });
}

function validatePolicyConfig(sails) {
    var policies = sails.config.policies;
    return _.all([
        _.isArray(policies['*'])
        //,        _.intersection(permissionPolicies, policies['*']).length === permissionPolicies.length
    ]);
}

