import jwt from 'jsonwebtoken';
import { secret } from '../../../config';

export default function createToken(user) {
  let scopes;
  if (user.admin) {
    scopes = 'admin';
  }
  return jwt.sign({
    id: user._id,
    username: user.username,
    scope: scopes
  }, secret, {
    algorithm: 'HS256',
    expiresIn: '12h'
  });
}
