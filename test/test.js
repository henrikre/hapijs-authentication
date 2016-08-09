import server from '../server';
import test from 'tape';

test('Authentication', t => {
  var options = {
    method: 'GET',
    url: '/api/users'
  };
  server.inject(options, response => {
    t.equal(response.statusCode, 401);
    server.stop(t.end);
  });
});

test('Authentication', t => {
  var options = {
    method: 'POST',
    url: '/api/users/authenticate',
    payload: {
      email: 'test@test.com',
      password: '123456'
    }
  };
  server.inject(options, response => {
    console.log(response.payload);
    t.equal(response.statusCode, 201);
    server.stop(t.end);
  });
});
