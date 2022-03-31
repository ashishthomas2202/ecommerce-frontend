import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddressBookView from '../Address/AddressBookView';
import AddressBook from '../Address/AddressBook';

export default function Shipping({ back, next }) {
  const router = useRouter();

  const [selectedShipping, setSelectedShipping] = useState(null);

  function handleSelection(value) {
    // console.log(type, value);
    // switch (type) {
    //   case 'set': {
    //     console.log('Shipping', id);
    //     setSelectedShipping(id);
    //     break;
    //   }
    // }

    console.log('set:', value);
    setSelectedShipping(value);
  }
  return (
    <div>
      <h1>Shipping Address</h1>
      <AddressBook
        title={'Shipping'}
        selectable={{
          state: true,
          set: (value) => handleSelection(value),
        }}
      />
      {/* <AddressBookView
        title={'Shipping'}
        selectable={{
          state: true,
          set: (id) => {
            handleSelection({ type: 'set', id });
          },
        }} 
        // selection={{
        //   initial: (value) => {
        //     console.log(value);
        //     return handleSelection({ type: 'initial', value });
        //   },
        //   set: (id) => handleSelection({ type: 'set', id }),
        //   notFound: () => handleSelection({ type: 'notFound' }),
        //   selected: () => selectedShipping,
        // }}
        // status={handleStatus}
      // />
      */}
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
