import jwt from 'jsonwebtoken';
import { User as userSettings } from './settings';

export function signToken(user) {
  let payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    account: user.account,
  };

  if (user.username) {
    payload['username'] = user.username;
  }
  if (user.email) {
    payload['email'] = user.email;
  }

  let options = {};

  if (userSettings.signin.expires) {
    options['expiresIn'] = userSettings.signin.expires;
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
