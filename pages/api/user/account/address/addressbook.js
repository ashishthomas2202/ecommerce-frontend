import nc from 'next-connect';
import db from '../../../../../utils/db';
import User from '../../../../../models/User';
import Account from '../../../../../models/Account';
import { getSession } from 'next-auth/react';
import Address from '../../../../../models/Address';

const handler = nc();

handler.get(async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    let userId = session.user.user;
    let accountId = session.user.account;

    await db.connect();
    let user = await User.findOne({ _id: userId, account: accountId });
    await db.disconnect;

    if (!user) {
      res.json({
        errors: {
          type: 'notification',
          message: 'Invalid User Credentials',
        },
      });
      return;
    }

    await db.connect();
    let account = await Account.findOne({ _id: accountId }).lean();
    await db.disconnect();

    if (!account) {
      res.json({
        errors: {
          type: 'notification',
          message: 'Unable to get account info',
        },
      });
      return;
    }

    let addressBook = account.addressBook;

    await db.connect();
    let addresses = await Address.find({ _id: addressBook.book }).lean();
    await db.disconnect();

    addressBook.book = addresses;

    res.json({
      addressBook,
    });
    return;
  } else {
    res.json({
      errors: {
        type: 'notification',
        message: 'User not authenticated',
      },
    });
    return;
  }

  return;
});

export default handler;
