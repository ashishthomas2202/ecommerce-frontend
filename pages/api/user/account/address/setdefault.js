import nc from 'next-connect';
import _ from 'lodash';
import db from '../../../../../utils/db';
import User from '../../../../../models/User';
import Account from '../../../../../models/Account';
import Address from '../../../../../models/Address';
import { AddressValidator } from '../../../../../utils/validation/addressValidator';
import { getSession } from 'next-auth/react';

const handler = nc();

handler.put(async (req, res) => {
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

    let data = req.body;

    let fields = {};

    if (data.defaultShippingAddress) {
      fields['defaultShippingAddress'] = data.defaultShippingAddress;
      account.addressBook.defaultShippingAddress = data.defaultShippingAddress;
    }
    if (data.defaultBillingAddress) {
      fields['defaultBillingAddress'] = data.defaultBillingAddress;
      account.addressBook.defaultBillingAddress = data.defaultBillingAddress;
    }

    if (Object.keys(fields).length === 0) {
      res.json({
        errors: {
          type: 'fields',
          message: 'Invalid data',
        },
      });
      return;
    }

    await db.connect();
    try {
      await account.save();
    } catch (err) {
      await db.disconnect();

      res.json({
        errors: {
          type: 'notification',
          message: 'Failed to set default address',
        },
      });
      return;
    }

    res.json({
      message: 'Default Address Added Successfully',
    });
    return;

    // let result = AddressValidator(fields);

    // if (result.errors) {
    //   res.json({
    //     errors: {
    //       type: 'fields',
    //       message: 'Invalid Address',
    //       errors: result.errors,
    //     },
    //   });
    //   return;
    // }

    // await db.connect();
    // const address = new Address(result.fields);

    // try {
    //   await address.save();
    // } catch (err) {
    //   await db.disconnect();

    //   res.json({
    //     errors: {
    //       type: 'notification',
    //       message: 'Failed to add address',
    //     },
    //   });
    //   return;
    // }
    // await db.disconnect();

    // account.addressBook.book.push(address);
    // if (result.fields.defaultShippingAddress) {
    //   account.addressBook.defaultShippingAddress = address._id;
    // }

    // if (result.fields.defaultBillingAddress) {
    //   account.addressBook.defaultBillingAddress = address._id;
    //   result.fields.defaultBillingAddress;
    // }

    // await db.connect();
    // try {
    //   await account.save();
    // } catch (err) {
    //   await address.remove();
    //   await db.disconnect();

    //   res.json({
    //     errors: {
    //       type: 'notification',
    //       message: 'Failed to add address',
    //     },
    //   });
    //   return;
    // }

    // res.json({
    //   message: 'Address Added Successfully',
    //   address: {
    //     _id: address._id,
    //     fullname: address.fullname,
    //     street1: address.street1,
    //     street2: address.street2,
    //     city: address.city,
    //     state: address.state,
    //     zip: address.zip,
    //     country: address.country,
    //     defaultShippingAddress: result.fields.defaultShippingAddress,
    //     defaultBillingAddress: result.fields.defaultBillingAddress,
    //   },
    // });
    // return;
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
