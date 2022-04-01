import React, { useState, useEffect, useContext } from 'react';
import { ViewSelector, View } from '../Basic/View/View';
import Loading from '../Loading/Loading';
import axios from 'axios';
import Grid from '../Basic/Grid/Grid';
import AddressCard from './AddressCard/AddressCard';
import AddressFormView from './AddressFormView';
import { Store } from '../../../utils/store';

export default function AddressBook({
  title = 'AddressBook',
  selectable = {
    state: false,
    set: () => {},
  },
}) {
  
  /************************Handle View*********************/
  const views = {
    addressGrid: 'addressGrid',
    addAddress: 'addAddress',
    updateAddress: 'updateAddress',
    loading: 'Loading',
  };

  const [select, setSelect] = useState(views.loading);

  /************************Handle AddressBook State*********************/
  const [addressBook, setAddressBook] = useState({
    book: [],
    defaultShippingAddress: null,
    defaultBillingAddress: null,
  });

  /************************Function to manage address*********************/
  // get the address from the db
  async function getAddress() {
    const { data } = await axios.get('/api/user/account/address/addressbook');

    if (data.errors) {
      console.log(data.errors);
    } else {
      setAddressBook({ ...addressBook, ...data.addressBook });
    }
  }

  // initialize the address book with data when component is mounted for the first time
  useEffect(() => {
    let fetchAddress = async () => await getAddress();
    setSelect(views.loading);

    fetchAddress();
  }, []);

  // delete address from the db
  async function deleteAddressHandler(id) {
    const { data } = await axios.delete(
      `/api/user/account/address/delete/${id}`
    );
    if (data.errors) {
      console.log(data.errors);
    } else {
      await getAddress();
    }
  }

  // store the data to be updated
  const [updateItemData, setUpdateItemData] = useState({});

  //  get the address to be editted and change the view to edit address form
  function editClickHandler(data) {
    console.log('editdata:', data);
    setUpdateItemData({ ...updateItemData, ...data });
    setSelect(views.updateAddress);
  }

  // set the default shipping/billing address in the addressvook
  async function setDefaultAddressHandler(fields) {
    const { data } = await axios.put(
      `/api/user/account/address/setdefault`,
      fields
    );
    if (data.errors) {
      console.log(data.errors);
    } else {
      getAddress();
    }
  }

  // handles the form time - add the address/ update the address
  function handleAddressFormClick(type) {
    switch (type) {
      case 'add':
        setSelect(views.addAddress);
        getAddress();
        break;
      case 'update':
        setSelect(views.updateAddress);
        getAddress();
        break;
      case 'cancel':
        setSelect(views.addressGrid);
        break;
    }
  }

  /************************Handle Address Selection*********************/

  // store the selected address
  const [selectedAddress, setSelectedAddress] = useState({
    shippingAddress: null,
    billingAddress: null,
    initialized: false,
  });

  // flag to check if the address in local storage is ready for validation
  const [validationReady, setValidationReady] = useState({
    state: false,
    addressBook: false,
  });

  // context to parse the data from the local storage
  const { state, dispatch } = useContext(Store);

  //runs if the component is selectable
  if (selectable.state) {
    useEffect(() => {
      const {
        addressBook: { shippingAddress, billingAddress },
      } = state;

      // initializing the selected address with the address stored in local storage
      setSelectedAddress({
        ...selectedAddress,
        shippingAddress,
        billingAddress,
        initialized: true,
      });

      console.log('shipping', shippingAddress, addressBook);
      render();
    }, [state]);

    // to select the type of address validation - shipping/billing
    useEffect(() => {
      render();
      setValidationReady({ ...validationReady, state: true });
      switch (title.toLowerCase()) {
        case 'shipping':
          selectable.set(selectedAddress.shippingAddress);
          break;
        case 'billing':
          selectable.set(selectedAddress.billingAddress);
          break;
      }
    }, [selectedAddress]);

    //to validate the address
    useEffect(() => {
      console.log(
        'calling',
        validationReady.state,
        validationReady.addressBook,
        selectedAddress,
        addressBook
      );

      if (
        validationReady.state &&
        validationReady.addressBook &&
        addressBook.book.length !== 0
      ) {
        console.log('called');
        validateAddress();
      }
    }, [validationReady]);
  }

  // to select the address when user click
  function handleAddressSelect({ id }) {
    console.log('clicked', id);
    switch (title.toLowerCase()) {
      case 'shipping':
        dispatch({
          type: 'ADD_SHIPPING_ADDRESS',
          payload: { id: id ? id : null },
        });
        break;
      case 'billing':
        dispatch({
          type: 'ADD_BILLING_ADDRESS',
          payload: { id: id ? id : null },
        });
        break;
    }
  }

  // function to validate the address
  function validateAddress() {
    console.log('checking');

    switch (title.toLowerCase()) {
      case 'shipping': {
        let result = addressBook.book.filter(
          (address) => address._id === selectedAddress.shippingAddress
        );
        if (result.length == 0) {
          if (addressBook.defaultShippingAddress) {
            resetSelectedAddress(addressBook.defaultShippingAddress);
          } else {
            resetSelectedAddress();
          }
        }
        break;
      }

      case 'billing': {
        let result = addressBook.book.filter(
          (address) => address._id === selectedAddress.billingAddress
        );
        if (result.length == 0) {
          if (addressBook.defaultBillingAddress) {
            resetSelectedAddress(addressBook.defaultBillingAddress);
          } else {
            resetSelectedAddress();
          }
        }
        break;
      }
    }
    setValidationReady({
      state: false,
      addressBook: false,
    });
  }

  // reset the selected address
  function resetSelectedAddress(id) {
    switch (title.toLowerCase()) {
      case 'shipping':
        dispatch({
          type: 'ADD_SHIPPING_ADDRESS',
          payload: { id: id ? id : null },
        });
        break;
      case 'billing':
        dispatch({
          type: 'ADD_BILLING_ADDRESS',
          payload: { id: id ? id : null },
        });
        break;
    }
  }

  // stores the address grid containing all the addresses
  const [addressGrid, setAddressGrid] = useState('');

  // renders the address grid and store it in the state to be loaded in the component
  function render() {
    let grid = '';
    console.log(addressBook.book.length);
    if (addressBook.book.length === 0) {
      grid = <h3>No Address Found</h3>;
    } else {
      grid = (
        <Grid gap={'1rem'} column={3}>
          {addressBook.book.map((address, i) => {
            let defaultShippingAddress =
              address._id === addressBook.defaultShippingAddress;
            let defaultBillingAddress =
              address._id === addressBook.defaultBillingAddress;

            let selected = false;

            if (selectable.state) {
              switch (title.toLowerCase()) {
                case 'shipping':
                  selected = address._id === selectedAddress.shippingAddress;
                  break;
                case 'billing':
                  selected = address._id === selectedAddress.billingAddress;
                  break;
              }
            }
            return (
              <AddressCard
                title={title}
                key={`${address._id}-address-book-grid-${title}-${i}`}
                data={address}
                selectable={selectable.state}
                selected={selected}
                handleSelect={handleAddressSelect}
                deleteHandler={deleteAddressHandler}
                editClickHandler={editClickHandler}
                defaultShippingAddress={defaultShippingAddress}
                defaultBillingAddress={defaultBillingAddress}
                defaultHandler={setDefaultAddressHandler}
              />
            );
          })}
        </Grid>
      );
    }
    setAddressGrid(grid);
    setSelect(views.addressGrid);
  }

  // to set the state of the validation
  useEffect(() => {
    console.log('book', addressBook);
    if (selectable.state) {
      setValidationReady({ ...validationReady, addressBook: true });
    }
    render();
  }, [addressBook]);

  return (
    <ViewSelector select={select}>
      <View name={views.addressGrid}>
        <div>
          <h1>AddressBook</h1>
          {addressGrid}
          <button onClick={() => setSelect(views.addAddress)}>Add</button>
        </div>
      </View>
      <View name={views.addAddress}>
        <AddressFormView
          cancel={() => handleAddressFormClick('cancel')}
          added={() => handleAddressFormClick('add')}
          totalAddresses={10}
        />
      </View>
      <View name={views.updateAddress}>
        <AddressFormView
          task={'update'}
          updateItemData={updateItemData}
          cancel={() => handleAddressFormClick('cancel')}
          updated={() => handleAddressFormClick('update')}
          totalAddresses={10}
        />
      </View>
      <View name={views.loading}>
        <Loading />
      </View>
    </ViewSelector>
  );
}
