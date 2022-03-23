import db from '../../../utils/db';
import User from '../../../models/User';
// import { User as userSettings } from '../../../utils/settings';
import _ from 'lodash';

import { SignUpValidator } from '../../../utils/validation/signUpFormValidator';
async function handler(req, res) {
  let data = req.body;

  let fields = {
    firstName: data.firstName ? data.firstName : null,
    lastName: data.lastName ? data.lastName : null,
    password: data.password ? data.password : null,
  };

  if (data.username) {
    fields['username'] = data.username;
  }
  if (data.email) {
    fields['email'] = data.email;
  }

  let result = SignUpValidator(fields);

  if (result.errors) {
    res.json({ errors: result.errors });
    return;
  }

  const newUser = new User(result.fields);
  await db.connect();
  let response = await newUser
    .save()
    .then((user) => {
      let data = { firstName: user.firstName, lastName: user.lastName };

      if (user.username) {
        data['username'] = user.username;
      }
      if (user.email) {
        data['email'] = user.email;
      }

      res.json({ message: 'User Created Successfully', user: data });
    })
    .catch((err) => {
      if (err.errors) {
        let firstError = Object.values(err.errors)[0];
        let errorObject = {};
        switch (firstError.kind) {
          case 'unique':
            errorObject['fieldName'] = _.capitalize(firstError.path);
            errorObject['message'] = `${errorObject.fieldName} already exist`;
            break;
          default:
            errorObject = { err };
        }
        res.json({ errors: [errorObject] });
      } else {
        res.json({ errors: err });
      }
    });

  await db.disconnect();
  //   console.log(await User.find({}));
}
export default handler;
