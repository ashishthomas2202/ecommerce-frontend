import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import { data } from '../../../utils/seed/userData';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users, (err) => {
    if (err) {
      res.send({ message: 'Users seeded Unuccessfully', error: err });
    } else {
      res.send({ message: 'Users seeded Successfully' });
    }
  });
  await db.disconnect();
});

export default handler;
