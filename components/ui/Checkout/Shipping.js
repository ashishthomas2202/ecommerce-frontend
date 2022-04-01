import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddressBook from '../Address/AddressBook';

export default function Shipping({ back, next }) {
  const router = useRouter();

  // To check if the shipping address is selected or not
  const [selectedShipping, setSelectedShipping] = useState(null);

  function handleSelection(value) {
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
