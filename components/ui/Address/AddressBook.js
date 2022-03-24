import React, { useState } from 'react';
import AddAddressView from './AddAddressView';
export default function AddressBook({ data }) {
  const [addAddressState, setAddAddressState] = useState(false);

  function handleAddAddress(value) {
    setAddAddressState(false);
  }

  let addressBook = data ? data.book : [];

  let addAddressButton = (
    <button
      onClick={() => {
        setAddAddressState(true);
      }}
    >
      {' '}
      Add Address
    </button>
  );

  let addressGrid = addressBook.map((address) => {
    return (
      <div key={'id' + address}>{address}</div>
      // <div>
      //   <h4>{address.fullname}</h4>
      //   <p>{address.street1}</p>
      //   {address.street2 ? <p>{address.street2}</p> : ''}
      //   <p>{address.city}</p>
      //   <p>
      //     {address.state}-{address.zip}
      //   </p>
      //   <p>{address.country}</p>
      // </div>
    );
  });

  if (!addAddressState) {
    if (addressBook.length === 0) {
      return (
        <div>
          {' '}
          <p>Address Book is empty</p>
          {addAddressButton}
        </div>
      );
    } else {
      return (
        <div>
          {addressGrid}
          {addAddressButton}
        </div>
      );
    }
  } else {
    return <AddAddressView isAdded={handleAddAddress} />;
  }
  return <div>AddressBook</div>;
}
