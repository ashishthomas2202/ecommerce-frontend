import nc from 'next-connect';
import _ from 'lodash';
import db from '../../../../../utils/db';
import User from '../../../../../models/User';
import Account from '../../../../../models/Account';
import Address from '../../../../../models/Address';
import { AddressValidator } from '../../../../../utils/validation/addressValidator';
import { getSession } from 'next-auth/react';

const handler = nc();

handler.post(async (req, res) => {
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

    let addressBook = account.addressBook;

    let data = req.body;

    let fields = {
      fullname: data.fullname ? _.capitalize(data.fullname) : null,
      street1: data.street1 ? data.street1 : null,
      street2: data.street2 ? data.street2 : null,
      city: data.city ? data.city : null,
      state: data.state ? data.state : null,
      zip: data.zip ? data.zip : null,
      country: data.country ? data.country : null,
      defaultShippingAddress:
        typeof data.defaultShippingAddress !== 'undefined'
          ? data.defaultShippingAddress
          : null,
      defaultBillingAddress:
        typeof data.defaultBillingAddress !== 'undefined'
          ? data.defaultBillingAddress
          : null,
    };

    let result = AddressValidator(fields);

    if (result.errors) {
      res.json({
        errors: {
          type: 'fields',
          message: 'Invalid Address',
          errors: result.errors,
        },
      });
      return;
    }

    await db.connect();
    const address = new Address(result.fields);

    try {
      await address.save();
    } catch (err) {
      await db.disconnect();

      res.json({
        errors: {
          type: 'notification',
          message: 'Failed to add address',
        },
      });
      return;
    }
    await db.disconnect();

    account.addressBook.book.push(address);
    if (result.fields.defaultShippingAddress) {
      account.addressBook.defaultShippingAddress = address._id;
    }

    if (result.fields.defaultBillingAddress) {
      account.addressBook.defaultBillingAddress = address._id;
      result.fields.defaultBillingAddress;
    }

    if (account.addressBook.book.length === 1) {
      account.addressBook.defaultShippingAddress =
        account.addressBook.book[0]._id.toString();
      account.addressBook.defaultBillingAddress =
        account.addressBook.book[0]._id.toString();
    }

    await db.connect();
    try {
      await account.save();
    } catch (err) {
      await address.remove();
      await db.disconnect();

      res.json({
        errors: {
          type: 'notification',
          message: 'Failed to add address',
        },
      });
      return;
    }

    res.json({
      message: 'Address Added Successfully',
      address: {
        _id: address._id,
        fullname: address.fullname,
        street1: address.street1,
        street2: address.street2,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
        defaultShippingAddress: result.fields.defaultShippingAddress,
        defaultBillingAddress: result.fields.defaultBillingAddress,
      },
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
