import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '../Basic/Button/Button';
import Grid from '../Basic/Grid/Grid';
import AddAddressView from './AddAddressView';
import AddressCard from './AddressCard/AddressCard';
// import AddAddressView from './AddAddressView';

export default function AddressBook({ title = 'AddressBook' }) {
  const [isLoading, setIsLoading] = useState(true);
  const [addressBookView, setAddressBookView] = useState(true);
  const [addressBook, setAddressBook] = useState({
    book: [],
    defaultShippingAddress: null,
    defaultBillingAddress: null,
  });

  async function getAddressBook() {
    const { data } = await axios.get('/api/user/account/addressbook');
    if (data.errors) {
      console.log(data.errors);
    } else {
      if (data.addressBook) {
        setAddressBook({
          ...addressBook,
          ...data.addressBook,
        });
        setIsLoading(false);
      }
    }
  }

  useEffect(async () => {
    await getAddressBook();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    let addressBookGrid =
      addressBook.book.length === 0 ? (
        <>
          <h4>No Address Found</h4>
          <Button
            label={'Add Address'}
            onClickHandler={() => {
              setAddressBookView(false);
            }}
          />
        </>
      ) : (
        <>
          <Grid data={addressBook.book} column={3} gap={'1rem'}>
            <AddressCard />
          </Grid>
          <Button
            label={'Add Address'}
            onClickHandler={() => {
              setAddressBookView(false);
            }}
          />
        </>
      );

    let view = addressBookView ? (
      <>
        <h2>{title}</h2>
        {addressBookGrid}
      </>
    ) : (
      <AddAddressView
        added={() => {
          setIsLoading(true);
          setAddressBookView(true);
          getAddressBook();
        }}
      />
    );

    return <>{view}</>;
  }
}

// const [addAddressState, setAddAddressState] = useState(false);
// function handleAddAddress(value) {
//   setAddAddressState(false);
// }
// let addressBook = data ? data.book : [];
// let addAddressButton = (
//   <button
//     onClick={() => {
//       setAddAddressState(true);
//     }}
//   >
//     {' '}
//     Add Address
//   </button>
// );
// let addressGrid = addressBook.map((address) => {
//   return (
//     <div key={'id' + address}>{address}</div>
//     // <div>
//     //   <h4>{address.fullname}</h4>
//     //   <p>{address.street1}</p>
//     //   {address.street2 ? <p>{address.street2}</p> : ''}
//     //   <p>{address.city}</p>
//     //   <p>
//     //     {address.state}-{address.zip}
//     //   </p>
//     //   <p>{address.country}</p>
//     // </div>
//   );
// });
// if (!addAddressState) {
//   if (addressBook.length === 0) {
//     return (
//       <div>
//         {' '}
//         <p>Address Book is empty</p>
//         {addAddressButton}
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         {addressGrid}
//         {addAddressButton}
//       </div>
//     );
//   }
// } else {
//   return <AddAddressView isAdded={handleAddAddress} />;
// }
// return <div>AddressBook</div>;

//   return <div>AddressBook</div>;
// }
