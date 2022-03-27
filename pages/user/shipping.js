import React, { useState, useEffect, useContext } from 'react';
import { User as UserSettings, Pages } from '../../utils/settings';
import { getSession } from 'next-auth/react';
import AddressBook from '../../components/ui/Address/AddressBookView';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';

export default function Shipping({ session }) {
  const router = useRouter();

  // To get/set the shipping address selected by user
  const { state, dispatch } = useContext(Store);

  // To track the shippingAddress selected by the user
  const [shippingAddressState, setShippingAddressState] = useState(
    state.addressBook.shippingAddress
  );

  // To reinitialize the shipping address stored in the state with the updated store context data
  useEffect(() => {
    const { addressBook } = state;

    setShippingAddressState(addressBook.shippingAddress);
  }, [state]);

  // To handle the "back" button click
  function handleBack() {
    // take the user to previous page
    router.back();
  }

  // to handle the "next" button click
  function handleNext(id) {
    // storing the selected shipping address in the context
    dispatch({
      type: 'ADD_SHIPPING_ADDRESS',
      payload: { id: shippingAddressState },
    });

    // take the user to next page
    router.push(Pages.checkout.shipping.redirect);
  }

  return (
    <AddressBook
      title={'Shipping Address'}
      selectable={true}
      selectionType={'shipping'}
      selectionState={{
        get: () => shippingAddressState,
        set: (value) => setShippingAddressState(value),
      }}
      next={handleNext}
      back={handleBack}
    />
  );
}

export async function getServerSideProps(context) {
  // getting the session if present
  const session = await getSession({ req: context.req });

  // User not authenticated/session not present
  if (!session) {
    return {
      // redirecting the user to signin page - redirect back once authenticated
      redirect: {
        destination: `${UserSettings.signin.link}?redirect=${Pages.checkout.shipping.link}`,
      },
    };
  }
  // User is authenticated
  else {
    return {
      props: {
        session,
      },
    };
  }
}
