import Boom from 'boom';
import User from '../model/User';
import createToken from '../util/token';
const verifyCredentials = require('../util/userFunctions').verifyCredentials;


module.exports = {
  method: 'POST',
  path: '/api/users/authenticate',
  config: {
    auth: false,
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (request, reply) => {
      reply({ token: createToken(request.pre.user) }).code(201);
    }
  }
};
