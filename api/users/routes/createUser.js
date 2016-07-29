import Boom from 'boom';
import argon2 from 'argon2';
import User from '../model/User';
import createToken from '../util/token';

async function hashPassword(password) {
  return await argon2.hash(password, await argon2.generateSalt());
}

module.exports = {
  method: 'POST',
  path: '/api/users',
  config: {
    auth: false,
    handler: (request, reply) => {
      let user = new User();
      user.email = request.payload.email;
      user.password = request.payload.password;
      user.admin = false;
      hashPassword(request.payload.password).then(hash => {
        user.password = hash;
        user.save().then(user => {
          reply({ token: createToken(user) }).code(201);
        })
        .catch(err => {
          throw Boom.badRequest(err);
        });
      });
    }
  }
};
