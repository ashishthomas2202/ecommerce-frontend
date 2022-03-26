import React, { useState, useEffect, useContext } from 'react';
import { User as UserSettings, Pages } from '../../utils/settings';
import { getSession } from 'next-auth/react';
import AddressBook from '../../components/ui/Address/AddressBookView';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';

export default function Shipping({ session }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [shippingAddressState, setShippingAddressState] = useState(
    state.addressBook.shippingAddress
  );

  // const [shippingAddressId, setShippingAddressId] = useState('');

  // const [reload, setReload] = useState(false);

  useEffect(() => {
    const { addressBook } = state;

    console.log('sshipping', addressBook.shippingAddress);
    // setShippingAddressId(addressBook.shippingAddress);
    setShippingAddressState(addressBook.shippingAddress);
    // setReload(true);
    // setReload(false);
  }, [state]);

  function handleBack() {
    // console.log('Selected Shipping', id);
    router.back();
  }

  function handleNext(id) {
    console.log('dispatch', shippingAddressState);
    dispatch({
      type: 'ADD_SHIPPING_ADDRESS',
      payload: { id: shippingAddressState },
    });

    // console.log('next:', shippingAddressState);
    router.push(UserSettings.billing.link);
    // setShippingAddress(id);
  }

  return (
    <AddressBook
      title={'Shipping Address'}
      selectable={true}
      selectionType={'shipping'}
      next={handleNext}
      back={handleBack}
      // selected={shippingAddressId}
      selectionState={{
        get: () => {
          console.log('get', shippingAddressState);
          return shippingAddressState;
        },
        set: (value) => {
          console.log('set', value);
          setShippingAddressState(value);
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
