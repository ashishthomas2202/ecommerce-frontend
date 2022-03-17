import nc from 'next-connect';
import User from '../../../models/User';
import { signToken } from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  let query = {};
  if (req.body.userId) {
    query['$or'] = [{ username: req.body.userId }, { email: req.body.userId }];
  } else if (req.body.username) {
    query['username'] = req.body.username;
  } else if (req.body.email) {
    query['email'] = req.body.email;
  }

  await db.connect();
  const user = await User.findOne(query);
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
