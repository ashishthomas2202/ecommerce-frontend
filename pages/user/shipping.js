import React, { useState, useEffect } from 'react';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';
import db from '../../utils/db';
import User from '../../models/User';
import Account from '../../models/Account';
import { User as UserSettings } from '../../utils/settings';
import { getSession } from 'next-auth/react';
import AddressBook from '../../components/ui/Address/AddressBook';

export default function Shipping({ addressBook }) {
  const router = useRouter();

  if (!addressBook) {
    return <div>Unable to load data</div>;
  } else {
    return <AddressBook data={addressBook} />;
  }
}

export async function getServerSideProps(context) {
  let userAccount = null;

  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: `${UserSettings.signin.link}?redirect=${UserSettings.shipping.link}`,
      },
    };
  } else {
    let currentUser = session.user;
    let userId = currentUser._id;
    let userAccountId = currentUser.account;
    await db.connect();
    await User.findOne({
      _id: userId,
      account: userAccountId,
    })
      .then(async (user) => {
        await Account.findOne({ _id: userAccountId })
          .populate('AddressBook')
          .lean({ virtuals: true })
          .then(async (account) => {
            userAccount = account;
          })
          .catch(async (err) => {
            console.log('AccountErr:', err);
          });
      })
      .catch(async (err) => {
        console.log('UserNotFound:', err);
      });
    await db.disconnect();
  }

  console.log('uacc:', userAccount);
  let addressBook = { book: [] };

  if (userAccount) {
    userAccount.AddressBook.book.map((address) => {
      addressBook.book.push(address.toString());
      console.log(address.toString());
    });
  }

  return {
    props: {
      session,
      addressBook,
    },
  };
}
