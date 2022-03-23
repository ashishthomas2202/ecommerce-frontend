import { Validator } from './validator';
import { userSchema } from '../../models/User';
import { User } from '../settings';

export const SignUpValidator = function (fields) {
  const { firstName, lastName, username, email } = userSchema.tree;

  
  Validator.initialize();

  if (fields.firstName)
    Validator.field({
      fieldName: 'First Name',
      data: fields.firstName,
    }).required();

  if (fields.lastName)
    Validator.field({
      fieldName: 'Last Name',
      data: fields.lastName,
    }).required();

  if (fields.username || username.required)
    Validator.field({
      fieldName: 'Username',
      data: fields.username,
    })
      .required({ state: username.required })
      .minLength({ minLength: username.minLength });

  if (fields.email || email.required)
    Validator.field({
      fieldName: 'Email',
      data: fields.email,
    })
      .required({ state: email.required })
      .isEmail();

  if (fields.password)
    Validator.field({
      fieldName: 'Password',
      data: fields.password,
    })
      .required()
      .minLength({ minLength: User.password.minLength });

  let result = { fields: fields };
  if (Validator.errors.length !== 0) {
    result['errors'] = Validator.errors;
  }

  return result;
};
