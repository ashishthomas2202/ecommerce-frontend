import React, { useState, useEffect } from 'react';

import { User as UserSettings } from '../../utils/settings';
import { getSession } from 'next-auth/react';
import AddressBook from '../../components/ui/Address/AddressBookView';

export default function Shipping({ session }) {
  return <AddressBook title={'Shipping Address'} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: `${UserSettings.signin.link}?redirect=${UserSettings.shipping.link}`,
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
}

// export async function getServerSideProps(context) {
//   // let userAccount = null;
//   // const session = await getSession({ req: context.req });
//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: `${UserSettings.signin.link}?redirect=${UserSettings.shipping.link}`,
//   //     },
//   //   };
//   // } else {
//   //   let currentUser = session.user;
//   //   let userId = currentUser._id;
//   //   let userAccountId = currentUser.account;
//   //   await db.connect();
//   //   await User.findOne({
//   //     _id: userId,
//   //     account: userAccountId,
//   //   })
//   //     .then(async (user) => {
//   //       await Account.findOne({ _id: userAccountId })
//   //         .populate('AddressBook')
//   //         .lean({ virtuals: true })
//   //         .then(async (account) => {
//   //           userAccount = account;
//   //         })
//   //         .catch(async (err) => {
//   //           console.log('AccountErr:', err);
//   //         });
//   //     })
//   //     .catch(async (err) => {
//   //       console.log('UserNotFound:', err);
//   //     });
//   //   await db.disconnect();
//   // }
//   // console.log('uacc:', userAccount);
//   // let addressBook = { book: [] };
//   // if (userAccount) {
//   //   userAccount.AddressBook.book.map((address) => {
//   //     addressBook.book.push(address.toString());
//   //     console.log(address.toString());
//   //   });
//   // }
//   // return {
//   //   props: {
//   //     session,
//   //     addressBook,
//   //   },
//   // };
// }
