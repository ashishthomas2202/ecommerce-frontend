import React, { useState, useEffect, useContext } from 'react';
import { User as UserSettings, Pages } from '../../utils/settings';
import { getSession } from 'next-auth/react';
import AddressBook from '../../components/ui/Address/AddressBookView';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';

export default function Billing({ session }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [billingAddressState, setBillingAddressState] = useState(
    state.addressBook.billingAddress
  );

  // const [shippingAddressId, setShippingAddressId] = useState('');

  // const [reload, setReload] = useState(false);

  useEffect(() => {
    const { addressBook } = state;

    console.log('bbilling', addressBook.billingAddress);
    // setShippingAddressId(addressBook.shippingAddress);
    setBillingAddressState(addressBook.billingAddress);
    // setReload(true);
    // setReload(false);
  }, [state]);

  function handleBack() {
    // console.log('Selected Shipping', id);
    router.back();
  }

  function handleNext(id) {
    console.log('dispatch', billingAddressState);
    dispatch({
      type: 'ADD_BILLING_ADDRESS',
      payload: { id: billingAddressState },
    });

    // console.log('next:', shippingAddressState);
    router.push(UserSettings.payment.link);
    // setShippingAddress(id);
  }

  return (
    <AddressBook
      title={'Billing Address'}
      selectable={true}
      selectionType={'billing'}
      next={handleNext}
      back={handleBack}
      selectionState={{
        get: () => {
          console.log('get', billingAddressState);
          return billingAddressState;
        },
        set: (value) => {
          console.log('set', value);
          setBillingAddressState(value);
        },
      }}
    />
  );
  // useEffect(() => {
  //   console.log('state', setShippingAddressState);
  // }, [shippingAddressState]);

  // return (
  //   <>
  //     {!reload ? (
  //       <AddressBook
  //         title={'Shipping Address'}
  //         selectable={true}
  //         selectionType={'shipping'}
  //         next={handleNext}
  //         back={handleBack}
  //         // selected={shippingAddressId}
  //         selectionState={{
  //           get: shippingAddressState,
  //           set: (value) => {
  //             console.log('set', value);
  //             setShippingAddressState(value);
  //           },
  //         }}
  //       />
  //     ) : (
  //       <p>Loading</p>
  //     )}
  //   </>
  // );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: `${UserSettings.signin.link}?redirect=${UserSettings.billing.link}`,
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

// import React from 'react';
// import { User as UserSettings } from '../../utils/settings';
// import { getSession } from 'next-auth/react';
// import AddressBook from '../../components/ui/Address/AddressBookView';
// import { useRouter } from 'next/router';

// export default function Billing({ session }) {
//   const router = useRouter();

//   function handleBack() {
//     // console.log('Selected Shipping', id);
//     router.back();
//   }

//   function handleNext(id) {
//     console.log('Selected Billing', id);
//     router.push(UserSettings.payment.link);
//   }

//   // return (
//   //   <AddressBook
//   //     title={'Billing Address'}
//   //     selectable={true}
//   //     selectionType={'billing'}
//   //     next={handleNext}
//   //     back={handleBack}
//   //   />
//   // );
//   return <p>billing</p>;
// }

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: `${UserSettings.signin.link}?redirect=${UserSettings.billing.link}`,
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
