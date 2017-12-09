var sails = require('sails'),
    Barrels = require('barrels');

before(function(done) {

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(120000);

    sails.lift({
        // configuration for testing purposes
        port: '6060',
        models: {
            connection: 'localDiskDb',
            migrate: 'drop'
        }
    }, function(err) {
        if (err) return done(err);
        // here you can load fixtures, etc.
        var barrels = new Barrels();
        fixtures = barrels.data;

        barrels.populate(['user', 'passport', 'transaction', 'resetpassword'], function(err) {
            done(err, sails);
        }, false);

    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});