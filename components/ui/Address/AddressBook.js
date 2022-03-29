import React, { useState, useEffect } from 'react';
import { ViewSelector, View } from '../Basic/View/View';
import Loading from '../Loading/Loading';
import axios from 'axios';
import Grid from '../Basic/Grid/Grid';
import AddressCard from './AddressCard/AddressCard';

export default function AddressBook({
  title = 'AddressBook',
  add,
  selectable,
  selection = { set: () => {}, selected: null },
  // selectionState: { set = () => {}, get = () => {} },
}) {
  const views = { addressGrid: 'addressGrid', loading: 'Loading' };

  const [select, setSelect] = useState(views.loading);

  const [addressBook, setAddressBook] = useState({
    book: [],
    defaultShippingAddress: null,
    defaultBillingAddress: null,
  });

  const [addressGrid, setAddressGrid] = useState();

  async function getAddress() {
    const { data } = await axios.get('/api/user/account/address/addressbook');

    if (data.errors) {
      console.log(data.errors);
    } else {
      // console.log(data);

      setAddressBook({ ...addressBook, ...data.addressBook });
    }
  }

  function handleAddressSelect({ id }) {
    // selectionState.set(id);
    // console.log('AddressBook:selected :', id);
    selection.set(id);
  }

  // useEffect(() => {
  //   console.log('addresss-selected:', selection.selected);
  // });

  function render() {
    let grid = '';

    if (addressBook.book.length == 0) {
      grid = <h4>No Address Found</h4>;
    } else {
      grid = (
        <Grid gap={'1rem'}>
          {addressBook.book.map((address, i) => {
            let selected = false;
            if (selectable) {
              selected =
                selection &&
                selection.selected &&
                address._id === selection.selected.replaceAll('"', '');
            }
            return (
              <AddressCard
                key={`${address._id}-address-book-grid-${title}-${i}`}
                data={address}
                selectable={selectable}
                selected={selected}
                handleSelect={handleAddressSelect}
                // deleteHandler={deleteAddressHandler}
                // editClickHandler={editClickHandler}
                // defaultShippingAddress={defaultShippingAddress}
                // defaultBillingAddress={defaultBillingAddress}
                // defaultHandler={setDefaultAddressHandler}
              />
            );
          })}
        </Grid>
      );
    }
    setAddressGrid(grid);
  }

  useEffect(async () => {
    await getAddress();
    setSelect(views.addressGrid);
  }, []);

  useEffect(() => {
    render();
  }, [addressBook, selection.selected]);

  return (
    <ViewSelector select={select}>
      <View name={views.addressGrid}>
        <div>
          {addressGrid}
          <button
            onClick={() => {
              add();
            }}
          >
            Add
          </button>
        </div>
      </View>
      <View name={views.loading}>
        <Loading />
      </View>
    </ViewSelector>
  );
}
