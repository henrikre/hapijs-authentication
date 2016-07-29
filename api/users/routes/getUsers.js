import Boom from 'boom';
import User from '../model/User';

module.exports = {
  method: 'GET',
  path: '/api/users',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (request, reply) => {
      User.find()
        .select('-password -__v')
        .exec((err, users) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!users.length) {
            throw Boom.notFound('No users found!');
          }
          reply(users);
        });
    }
  }
};
