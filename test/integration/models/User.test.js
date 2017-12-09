var should = require('chai').should();

describe('User', function() {
  it ('should not be empty', function(done) {
    User.find().exec(function(err, users) {
      users.length.should.be.gt(0);

      done();
    });
  });
});