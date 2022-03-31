import React from 'react';
import AddressBookView from '../../components/ui/Address/AddressBookView';
export default function AddressBook() {
  return (
    <div>
      <h1>Address Book</h1>
      <AddressBookView />
    </div>
  );
}
// import React, { useState, useEffect } from 'react';

// import { User as UserSettings } from '../../utils/settings';
// import { getSession } from 'next-auth/react';
// import AddressBookView from '../../components/ui/Address/AddressBookView';

// export default function AddressBookPage({ session }) {
//   return <AddressBookView title={'Address Book'} />;
// }

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: `${UserSettings.signin.link}?redirect=${UserSettings.shipping.link}`,
//       },
//     };
//   } else {
//     return {
//       props: {
//         session,
//       },
//     };
//   }
// }
