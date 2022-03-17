import nc from 'next-connect';
import User from '../../../models/User';
import { User as userSettings } from '../../../utils/settings';
import { signToken } from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  let query = {};

  if (req.body.userId) {
    console.log('uid');
    query['$or'] = [{ username: req.body.userId }, { email: req.body.userId }];
  } else if (req.body.username) {
    console.log('user');

    query['username'] = req.body.username;
  } else if (req.body.email) {
    console.log('ema');

    query['email'] = req.body.email;
  }

  console.log('signin username', req.body.userId);
  console.log('signin password', req.body.password);

  await db.connect();
  const user = await User.findOne({ query });
  await db.disconnect();

  console.log('exist', user);
  if (user && user.authenticate(req.body.password)) {
    const token = signToken(user);

    res.send({
      token,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  } else {
    res.status(401).send({ message: 'Invalid user or password' });
  }
});

export default handler;
