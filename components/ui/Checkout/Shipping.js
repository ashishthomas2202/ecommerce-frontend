import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AddressBookView from '../Address/AddressBookView';
import { Store } from '../../../utils/store';

export default function Shipping({ back, next }) {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const [selectedShipping, setSelectedShipping] = useState(null);

  useEffect(() => {
    const {
      addressBook: { shippingAddress },
    } = state;

    setSelectedShipping(shippingAddress);
  }, [state]);

  // function handleStatus() {
  //   console.log('shipping status');
  // }

  function handleSelection(id, type) {
    switch (type) {
      case 'set':
        // console.log('Shipping-set', id);
        setSelectedShipping(id);
        dispatch({
          type: 'ADD_SHIPPING_ADDRESS',
          payload: { id: id },
        });
        break;
    }
  }
  return (
    <div>
      <h1>Shipping Address</h1>
      <AddressBookView
        title={'Shipping'}
        selectable
        selection={{
          set: (id) => handleSelection(id, 'set'),
          selected: selectedShipping,
        }}
        // status={handleStatus}
      />
      <button
        onClick={() => {
          back();
        }}
      >
        back
      </button>
      <button
        onClick={() => {
          if (selectedShipping) {
            next();
          } else {
            console.log('error', 'Please select a shipping address');
          }
        }}
      >
        next
      </button>
    </div>
  );
}
