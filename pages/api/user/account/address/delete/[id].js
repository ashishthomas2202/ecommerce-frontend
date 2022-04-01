import nc from 'next-connect';
import _ from 'lodash';
import db from '../../../../../../utils/db';
import User from '../../../../../../models/User';
import Account from '../../../../../../models/Account';
import Address from '../../../../../../models/Address';
import { getSession } from 'next-auth/react';

const handler = nc();

handler.delete(async (req, res) => {
  const { id } = req.query;

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
    const account = await Account.findOne({ _id: accountId });
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

    await db.connect();
    const address = await Address.findOne({ _id: id });
    await db.disconnect();

    if (!address) {
      res.json({
        errors: {
          type: 'notification',
          message: 'Unable to get account info',
        },
      });
      return;
    }

    account.addressBook.book = account.addressBook.book.filter(
      (currentAddress) => {
        let currentAddressId = currentAddress.toString();
        return currentAddressId !== id;
      }
    );

    // console.log(account.addressBook.defaultShippingAddress);

    if (
      account.addressBook.defaultShippingAddress &&
      account.addressBook.defaultShippingAddress.toString() === id
    ) {
      account.addressBook.defaultShippingAddress = null;
    }

    if (
      account.addressBook.defaultBillingAddress &&
      account.addressBook.defaultBillingAddress.toString() === id
    ) {
      account.addressBook.defaultBillingAddress = null;
    }

    console.log(account.addressBook.book.length);

    if (account.addressBook.book.length === 1) {
      console.log('running1', account.addressBook.book[0].toString());
      account.addressBook.defaultShippingAddress =
        account.addressBook.book[0].toString();
      account.addressBook.defaultBillingAddress =
        account.addressBook.book[0].toString();
    } else if (account.addressBook.book.length === 0) {
      console.log('running2');

      account.defaultShippingAddress = null;
      account.defaultBillingAddress = null;
    }

    await db.connect();
    try {
      await account.save();
      await address.remove();
    } catch (err) {
      await db.disconnect();
      res.json({
        errors: {
          type: 'notification',
          message: 'Failed to delete address',
        },
      });
      return;
    }
    await db.disconnect();

    res.json({
      message: 'Address Deleted Successfully',
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
