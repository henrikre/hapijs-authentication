import Boom from 'boom';
import User from '../model/User';
import argon2 from 'argon2';

function verifyUser(request, reply) {
  User.findOne({
    email: request.payload.email
  }).exec().then(user => {
    console.log('Not found')
    // Check if user exists with given email
    if (user) {
      if (user.email === req.payload.email) {
        res(Boom.badRequest('User with that email exists'));
        return;
      }
    }

    reply(req.payload);
  })
  .catch(err => {
    Boom.badRequest('Something went wrong');
  });
}

function verifyCredentials(request, reply) {

  User.findOne({
    email: request.payload.email
  })
  .exec()
  .then(user => {
    console.log(user);
    if (user) {
      argon2.verify(user.password, request.payload.password).then(match => {
        if (match) {
          reply(user);
        } else {
          reply(Boom.badRequest('Incorrect password'));
        }
      })
    } else {
      reply(Boom.badRequest('Incorrect email'));
    }
  });
}

module.exports = {
  verifyCredentials: verifyCredentials,
  verifyUser: verifyUser
};
