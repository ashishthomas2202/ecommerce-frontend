import nc from 'next-connect';
import User from '../../../models/User';
import { User as userSettings } from '../../../utils/settings';
import { signToken } from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  let query = {};
  if (userSettings.username && userSettings.email) {
    query['$or'] = [{ username: req.body.userId }, { email: req.body.userId }];
  } else if (userSettings.username) {
    query['username'] = req.body.userId;
  } else if (userSettings.email) {
    query['email'] = req.body.userId;
  }

  console.log('received');
  await db.connect();
  const user = await User.findOne({ query });
  await db.disconnect();

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
