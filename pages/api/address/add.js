import nc from 'next-connect';
import { getSession } from 'next-auth/react';
import _ from 'lodash';
import { AddressValidator } from '../../../utils/validation/addressValidator';

import db from '../../../utils/db';
import User from '../../../models/User';
import Account from '../../../models/Account';
import Address from '../../../models/Address';

const handler = nc();

handler.post(async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    let currentUser = session.user;

    await db.connect();
    let user = await User.findOne({
      _id: currentUser.user,
      account: currentUser.account,
    });
    await db.disconnect();

    if (!user) {
      res.json({
        errors: {
          authenticated: true,
          message: 'Unable to process the request',
        },
      });
      return;
    }

    await db.connect();
    let account = await Account.findOne({ _id: currentUser.account });
    await db.disconnect();

    if (!account) {
      res.json({
        errors: {
          authenticated: true,
          message: 'Unable to process the request',
        },
      });
      return;
    }

    let data = req.body;

    let fields = {
      fullname: data.fullname ? _.capitalize(data.fullname) : null,
      street1: data.street1 ? data.street1 : null,
      street2: data.street2 ? data.street2 : null,
      city: data.city ? data.city : null,
      state: data.state ? data.state : null,
      zip: data.zip ? data.zip : null,
      country: data.country ? data.city : null,
    };

    let result = AddressValidator(fields);

    if (result.errors) {
      res.json({ errors: result.errors });
      return;
    }

    console.log(result.fields);
    const address = new Address(result.fields);

    await db.connect();
    await address.save().catch(async (err) => {
      await db.disconnect();
      console.log('Add Address(save address): ', err);

      res.json({ errors: err });
    });

    account.AddressBook.book.push(address);
    await account.save().catch(async (err) => {
      await db.disconnect();
      console.log('Add Address(save account): ', err);

      res.json({ errors: err });
    });

    await db.disconnect();
    res.json({ data: account.AddressBook.book });
  } else {
    res.json({
      errors: {
        authenticated: false,
        message: 'User not authenticated',
      },
    });
  }

  return;
});

export default handler;
