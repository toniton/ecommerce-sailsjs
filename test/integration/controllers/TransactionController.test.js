var request = require('supertest');

describe('TransactionController', function() {

  describe('#response()', function() {
    it('It should login successfully', function (done) {
      request(sails.hooks.http.app)
        .post('/api/transaction/response')
        .send({ status: 'completed', flutterChargeReference: 'FFV1234', flutterChargeResponseMessage: 'Yelutide seasoning' })
        .expect(200,done)
    });
    it('It should throw forbidden error for login failure', function (done) {
      request(sails.hooks.http.app)
        .post('/api/transaction/response')
        .send({ status: 'started', flutterChargeReference: '234', flutterChargeResponseMessage: 'Yelutide seasoning' })
        .expect(200,done)
    });
    it('It should throw bad request error for wrong attributes', function (done) {
      request(sails.hooks.http.app)
        .post('/api/transaction/response')
        .send({ name: 'yam@egg.com', class: 'tutu' })
        .expect(400,done)
    });
    it('It should throw forbidden error for get request method', function (done) {
      request(sails.hooks.http.app)
        .get('/api/transaction/response?email=anthon')
        .expect(403,done)
    });
    it('It should throw forbidden error for put request method', function (done) {
      request(sails.hooks.http.app)
        .put('/api/transaction/response')
        .send({ name: 'yam@egg.com', class: 'tutu' })
        .expect(403,done)
    });
    it('It should throw forbidden error for delete request method', function (done) {
      request(sails.hooks.http.app)
        .delete('/api/transaction/response/4')
        .expect(403,done)
    });
  });

});