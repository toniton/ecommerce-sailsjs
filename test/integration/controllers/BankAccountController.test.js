var request = require('supertest');

describe('BankAccountController', function() {

  describe('#verify()', function() {
    it('It should verify successfully', function (done) {
      request(sails.hooks.http.app)
        .post('/api/bankaccount/verify')
        .send({ accountNumber:"0690000005", bankCode:"044" })
        .expect(200)
        .expect({
            code: "OK",
            data: {},
            message: "Operation is successfully executed"
        },done)
    });
    it('It should throw forbidden error for verify failure', function (done) {
      request(sails.hooks.http.app)
        .post('/api/bankaccount/verify')
        .send({ accountNumber:"0690000005", bankCode:"098" })
        .expect(200,done)
    });
    it('It should throw bad request error for wrong attributes', function (done) {
      request(sails.hooks.http.app)
        .post('/api/bankaccount/verify')
        .send({ name: 'yam@egg.com', class: 'tutu' })
        .expect(400,done)
    });
    it('It should throw forbidden error for get request method', function (done) {
      request(sails.hooks.http.app)
        .get('/api/bankaccount/verify?email=anthon')
        .expect(403,done)
    });
    it('It should throw forbidden error for put request method', function (done) {
      request(sails.hooks.http.app)
        .put('/api/bankaccount/verify')
        .send({ name: 'yam@egg.com', class: 'tutu' })
        .expect(403,done)
    });
    it('It should throw forbidden error for delete request method', function (done) {
      request(sails.hooks.http.app)
        .delete('/api/bankaccount/verify/4')
        .expect(403,done)
    });
  });

});