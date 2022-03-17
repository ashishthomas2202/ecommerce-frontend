import nc from 'next-connect';
import User from '../../../models/User';
import { User as userSettings } from '../../../utils/settings';
import { signToken } from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  let data = req.body;

  console.log('signup', data.password);
  let fields = {
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  };

  if (data.username) {
    fields['username'] = data.username;
  }
  if (data.email) {
    fields['email'] = data.email;
  }

  await db.connect();
  const newUser = new User(fields);
  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);

  res.send({
    token,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });
});

export default handler;
