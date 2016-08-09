import { Server } from 'hapi';
import Boom from 'boom';
import hapiAuthJwt from 'hapi-auth-jwt';
import mongoose from 'mongoose';
import glob from 'glob';
import path from 'path';

const server = new Server();
const dbUrl = 'mongodb://localhost:27017/hapi-authentication';
import { secret } from './config';

server.connection({ port: 9000, routes: { cors: true } });

server.register(hapiAuthJwt, err => {

  server.auth.strategy('jwt', 'jwt', 'required', {
    key: secret,
    verifyOptions: { algorithms: ['HS256'] }
  });

  glob.sync('api/**/routes/*.js', {
    root: __dirname
  }).forEach(file => {
    console.log(file);
    const route = require(path.join(__dirname, file));
    server.route(route);
  });
});

server.start(err => {
  if (err) {
    throw err;
  }

  mongoose.connect(dbUrl, {}, err => {
    if (err) {
      throw err;
    }
  });

  console.log('Hapi listening on port 9000');
});

export default server;
