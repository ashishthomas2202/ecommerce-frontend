import nc from 'next-connect';
import User from '../../../../models/User';
import Account from '../../../../models/Account';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await Account.findOne({
    _id: req.body.userId,
    account: req.body.accountId,
  });

  const account = null;
  if (user) {
    account = await Account.findOne({ _id: req.body.accountId });
  }
  await db.disconnect();

  if (account) {
    res.send({
      data: account,
    });
  } else {
    res.status(401).send({ message: 'Invalid user or password' });
  }
});

export default handler;
