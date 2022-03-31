import React from 'react';
import AddressBookView from '../../components/ui/Address/AddressBookView';
export default function Billing() {
  return <AddressBookView />;
}
// import React, { useState, useEffect, useContext } from 'react';
// import { User as UserSettings, Pages } from '../../utils/settings';
// import { getSession } from 'next-auth/react';
// import AddressBook from '../../components/ui/Address/AddressBookView';
// import { Store } from '../../utils/store';
// import { useRouter } from 'next/router';

// export default function Billing({ session }) {
//   const router = useRouter();

//   // To get/set the billing address selected by user
//   const { state, dispatch } = useContext(Store);

//   // To track the billingAddress selected by the user
//   const [billingAddressState, setBillingAddressState] = useState(
//     state.addressBook.billingAddress
//   );

//   // To reinitialize the billing address stored in the state with the updated store context data
//   useEffect(() => {
//     const { addressBook } = state;

//     setBillingAddressState(addressBook.billingAddress);
//   }, [state]);

//   // To handle the "Back" button click
//   function handleBack() {
//     // take the user to previous page
//     router.back();
//   }
//   //To handle the 'next' button click
//   function handleNext(id) {
//     // storing the selected billing address in the context
//     dispatch({
//       type: 'ADD_BILLING_ADDRESS',
//       payload: { id: billingAddressState },
//     });

//     // take the user to next page
//     router.push(Pages.checkout.billing.redirect);
//   }

//   return (
//     <AddressBook
//       title={'Billing Address'}
//       selectable={true}
//       selectionType={'billing'}
//       selectionState={{
//         get: () => billingAddressState,
//         set: (value) => setBillingAddressState(value),
//       }}
//       next={handleNext}
//       back={handleBack}
//     />
//   );
// }

// export async function getServerSideProps(context) {
//   // getting the session if present
//   const session = await getSession({ req: context.req });

//   // User not authenticated/ session not present
//   if (!session) {
//     return {
//       // redirecting the user to signin page - redirect back once authenticated
//       redirect: {
//         destination: `${UserSettings.signin.link}?redirect=${Pages.checkout.billing.link}`,
//       },
//     };
//   }
//   // User is authenticated
//   else {
//     return {
//       props: {
//         session,
//       },
//     };
//   }
// }
