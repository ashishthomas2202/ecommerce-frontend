import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddressBook from '../Address/AddressBook';

export default function Billing({ back, next }) {
  const router = useRouter();

  // To check if the billing address is selected or not
  const [selectedBilling, setSelectedBilling] = useState(null);

  function handleSelection(value) {
    console.log('set:', value);
    setSelectedBilling(value);
  }
  return (
    <div>
      <h1>Billing Address</h1>
      <AddressBook
        title={'Billing'}
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
          if (selectedBilling) {
            next();
          } else {
            console.log('error', 'Please select a billing address');
          }
        }}
      >
        next
      </button>
    </div>
  );
}
