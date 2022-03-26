import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '../Basic/Button/Button';
import Grid from '../Basic/Grid/Grid';
import AddressFormView from './AddressFormView';
import AddressCard from './AddressCard/AddressCard';

export default function AddressBook({ title = 'AddressBook' }) {
  const [updateItemData, setupdateItemData] = useState();
  // const [addressBookView, setAddressBookView] = useState(true);

  // book, add, update, loading
  const [view, setView] = useState('loading');
  const [addressBook, setAddressBook] = useState({
    book: [],
    defaultShippingAddress: null,
    defaultBillingAddress: null,
  });

  async function getAddressBook() {
    const { data } = await axios.get('/api/user/account/address/addressbook');
    if (data.errors) {
      console.log(data.errors);
    } else {
      if (data.addressBook) {
        setAddressBook({
          ...addressBook,
          ...data.addressBook,
        });
        setView('book');
        // setIsLoading(false);
      }
    }
  }

  async function deleteAddressHandler(id) {
    const { data } = await axios.delete(
      `/api/user/account/address/delete/${id}`
    );
    if (data.errors) {
      console.log(data.errors);
    } else {
      console.log('response:', data);
      getAddressBook();
    }
  }

  function editClickHandler(data) {
    // console.log(data);
    setupdateItemData(data);
    setView('update');
  }
  // async function deleteAddressHandler(id) {
  //   const { data } = await axios.delete(
  //     `/api/user/account/address/delete/${id}`
  //   );
  //   if (data.errors) {
  //     console.log(data.errors);
  //   } else {
  //     console.log('response:', data);
  //     getAddressBook();
  //   }
  // }

  async function setDefaultAddressHandler(fields) {
    const { data } = await axios.put(
      `/api/user/account/address/setdefault`,
      fields
    );
    if (data.errors) {
      console.log(data.errors);
    } else {
      console.log('response:', data);
      getAddressBook();
    }
  }

  useEffect(async () => {
    await getAddressBook();
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // } else {
  //   let addressBookGrid =
  //     addressBook.book.length === 0 ? (
  //       <>
  //         <h4>No Address Found</h4>
  //         <Button
  //           label={'Add Address'}
  //           onClickHandler={() => {
  //             setAddressBookView(false);
  //           }}
  //         />
  //       </>
  //     ) : (
  //       <>
  //         <Grid data={addressBook.book} column={3} gap={'1rem'}>
  //           {addressBook.book.map((address, i) => {
  //             let defaultShippingAddress =
  //               address._id === addressBook.defaultShippingAddress;
  //             let defaultBillingAddress =
  //               address._id === addressBook.defaultBillingAddress;
  //             return (
  //               <AddressCard
  //                 key={`${address._id}-address-book-grid-${title}-${i}`}
  //                 data={address}
  //                 defaultShippingAddress={defaultShippingAddress}
  //                 defaultBillingAddress={defaultBillingAddress}
  //                 deleteHandler={deleteAddressHandler}
  //                 defaultHandler={setDefaultAddressHandler}
  //               />
  //             );
  //           })}
  //         </Grid>
  //         <Button
  //           label={'Add Address'}
  //           onClickHandler={() => {
  //             setAddressBookView(false);
  //           }}
  //         />
  //       </>
  //     );

  //   let view = addressBookView ? (
  //     <>
  //       <h2>{title}</h2>
  //       {addressBookGrid}
  //     </>
  //   ) : (
  //     <AddAddressView
  //       cancel={() => {
  //         setAddressBookView(true);
  //       }}
  //       added={() => {
  //         setIsLoading(true);
  //         setAddressBookView(true);
  //         getAddressBook();
  //       }}
  //       totalAddresses={addressBook.book.length}
  //     />
  //   );

  //   // return <>{view}</>;
  // }

  switch (view) {
    case 'book': {
      return (
        <>
          <h2>{title}</h2>
          {addressBook.book.length === 0 ? (
            <h4>No Address Found</h4>
          ) : (
            <Grid data={addressBook.book} column={3} gap={'1rem'}>
              {addressBook.book.map((address, i) => {
                let defaultShippingAddress =
                  address._id === addressBook.defaultShippingAddress;
                let defaultBillingAddress =
                  address._id === addressBook.defaultBillingAddress;
                return (
                  <AddressCard
                    key={`${address._id}-address-book-grid-${title}-${i}`}
                    data={address}
                    deleteHandler={deleteAddressHandler}
                    editClickHandler={editClickHandler}
                    defaultShippingAddress={defaultShippingAddress}
                    defaultBillingAddress={defaultBillingAddress}
                    defaultHandler={setDefaultAddressHandler}
                  />
                );
              })}
            </Grid>
          )}

          <Button
            label={'Add Address'}
            onClickHandler={() => {
              setView('add');
            }}
          />
        </>
      );
      break;
    }
    case 'add': {
      return (
        <AddressFormView
          cancel={() => {
            setView('book');
          }}
          added={() => {
            // setIsLoading(true);
            setView('loading');
            getAddressBook();
          }}
          totalAddresses={addressBook.book.length}
        />
      );
      break;
    }

    case 'update': {
      return (
        <AddressFormView
          task="update"
          cancel={() => {
            setView('book');
          }}
          updateItemData={updateItemData}
          updated={() => {
            setView('loading');
            getAddressBook();
          }}
          totalAddresses={addressBook.book.length}
        />
      );
      break;
    }
    case 'loading': {
      return <div>Loading...</div>;
      break;
    }
    default: {
      return <h3>Unable to load</h3>;
    }
  }
}
