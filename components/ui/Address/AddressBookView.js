import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '../Basic/Button/Button';
import Grid from '../Basic/Grid/Grid';
import AddressFormView from './AddressFormView';
import AddressCard from './AddressCard/AddressCard';
import style from './style.module.scss';

export default function AddressBook({
  title = 'AddressBook',
  selectable,
  selectionType,
  next,
  back,
}) {
  // book, add, update, loading
  const [view, setView] = useState({
    main: selectable ? 'selectable' : 'book',
    current: 'loading',
  });
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
        setView({ ...view, current: view.main });
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

  const [updateItemData, setupdateItemData] = useState();

  function editClickHandler(data) {
    setupdateItemData(data);
    setView({ ...view, current: 'update' });
  }

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

  // const [selection, setSelection] = useState({ id: null, element: null });
  const [selection, setSelection] = useState(null);

  function handleAddressSelect({ id, currentItem }) {
    console.log(
      'clicked',
      id

      // currentItem.current.classList.add(style.selected)
    );

    setSelection(id);
    // selection.element &&
    //   selection.element.current.classList.remove(style.selected);
    // currentItem && currentItem.current.classList.add(style.selected);
    // setSelection({ id, element: currentItem });
  }

  useEffect(async () => {
    await getAddressBook();
  }, []);

  switch (view.current) {
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
              setView({ ...view, current: 'add' });
            }}
          />
        </>
      );
      break;
    }
    case 'selectable': {
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

                let selected = selection && selection === address._id;

                if (selection == null) {
                  selected =
                    (selectionType == 'shipping' &&
                      defaultShippingAddress &&
                      setSelection(address._id)) ||
                    (selectionType == 'billing' &&
                      defaultBillingAddress &&
                      setSelection(address._id));
                }

                return (
                  <AddressCard
                    key={`${address._id}-address-book-grid-${title}-${i}`}
                    data={address}
                    deleteHandler={deleteAddressHandler}
                    editClickHandler={editClickHandler}
                    defaultShippingAddress={defaultShippingAddress}
                    defaultBillingAddress={defaultBillingAddress}
                    defaultHandler={setDefaultAddressHandler}
                    selectable={true}
                    selected={selected}
                    handleSelect={handleAddressSelect}
                  />
                );
              })}
            </Grid>
          )}

          {back && (
            <Button
              label={'Back'}
              onClickHandler={() => {
                back();
              }}
            />
          )}

          {next && (
            <Button
              label={'Next'}
              onClickHandler={() => {
                if (selection) {
                  next(selection);
                } else {
                  console.log('Not Selected');
                }
                // if (selection.id) {
                //   next(selection.id);
                // } else {
                //   console.log('Not Selected');
                // }
              }}
            />
          )}
        </>
      );
      break;
    }
    case 'add': {
      return (
        <AddressFormView
          cancel={() => {
            setView({ ...view, current: view.main });
          }}
          added={() => {
            setView({ ...view, current: 'loading' });
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
            setView({ ...view, current: view.main });
          }}
          updateItemData={updateItemData}
          updated={() => {
            setView({ ...view, current: 'loading' });
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
