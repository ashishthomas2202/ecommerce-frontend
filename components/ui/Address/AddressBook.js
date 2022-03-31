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

  const [addressBook, setAddressBook] = useState({
    book: [],
    defaultShippingAddress: null,
    defaultBillingAddress: null,
  });

  async function getAddress() {
    const { data } = await axios.get('/api/user/account/address/addressbook');

    if (data.errors) {
      console.log(data.errors);
    } else {
      setAddressBook({ ...addressBook, ...data.addressBook });
    }
  }

  useEffect(() => {
    let fetchAddress = async () => await getAddress();
    setSelect(views.loading);

    fetchAddress();
  }, []);

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

  const [updateItemData, setUpdateItemData] = useState({});

  function editClickHandler(data) {
    console.log('editdata:', data);
    setUpdateItemData({ ...updateItemData, ...data });
    setSelect(views.updateAddress);
  }

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

  ///////////////////////////////////////////////////////////////////////
  const [selectedAddress, setSelectedAddress] = useState({
    shippingAddress: null,
    billingAddress: null,
    initialized: false,
  });
  const [validationReady, setValidationReady] = useState({
    state: false,
    addressBook: false,
  });

  const { state, dispatch } = useContext(Store);

  if (selectable.state) {
    useEffect(() => {
      const {
        addressBook: { shippingAddress, billingAddress },
      } = state;

      setSelectedAddress({
        ...selectedAddress,
        shippingAddress,
        billingAddress,
        initialized: true,
      });

      console.log('shipping', shippingAddress, addressBook);
      render();
      // validateAddress();
    }, [state]);

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

  /////////////////////////////////////////////////////////////////////////
  // let intervalId = null;

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
    // if (!validationReady) {
    //   // if (!intervalId) {
    //   //   intervalId = setInterval(validateAddress, 100);
    //   // }
    // } else {
    //   clearInterval(intervalId);
    //   intervalId = null;
    //   console.log('ready');
    // }
  }

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

  const [addressGrid, setAddressGrid] = useState('');

  function render() {
    let selected = false;
    let grid = '';
    console.log(addressBook.book.length);
    if (addressBook.book.length === 0) {
      grid = <h3>No Address Found</h3>;
    } else {
      let selection = false;
      grid = (
        <Grid gap={'1rem'} column={3}>
          {addressBook.book.map((address, i) => {
            let defaultShippingAddress =
              address._id === addressBook.defaultShippingAddress;
            let defaultBillingAddress =
              address._id === addressBook.defaultBillingAddress;

            // if (selectable.state && selectedAddress.initialized) {
            //   selected =
            //     address._id ===
            //     (title.toLowerCase() == 'shipping'
            //       ? selectedAddress.shippingAddress
            //       : selectedAddress.billingAddress);

            //   if (selected) {
            //     selection = true;
            //   }
            //   // if (!selected) {
            //   //   if (title.toLowerCase() == 'shipping' && defaultShippingAddress) {
            //   //     selected = defaultShippingAddress;

            //   //   }
            //   // }
            // }
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

    // if (
    //   selectable.state &&
    //   selectedAddress.initialized &&
    //   selectedAddress.shippingAddress &&
    //   selection
    // )
    //   setSelect(views.addressGrid);
    // else {
    // }
  }

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

  // useEffect(() => {
  //   const {
  //     addressBook: { shippingAddress, billingAddress },
  //   } = state;

  //   setSelectedAddress({
  //     ...selectedAddress,
  //     shippingAddress,
  //     billingAddress,
  //     initialized: true,
  //   });
  // }, [state]);

  // useEffect(() => {
  //   console.log('SELECTED:', selectedAddress);
  //   if (selectable.state) {
  //     switch (title.toLowerCase()) {
  //       case 'shipping':
  //         selectable.set(selectedAddress.shippingAddress);
  //         break;
  //       case 'shipping':
  //         selectable.set(selectedAddress.billingAddress);
  //         break;
  //     }
  //     // checkSelection();

  //     render();
  //   }
  // }, [selectedAddress, state]);

  // async function getAddress() {
  //   console.log('running');
  //   const { data } = await axios.get('/api/user/account/address/addressbook');

  //   if (data.errors) {
  //     console.log(data.errors);
  //   } else {
  //     setAddressBook({ ...addressBook, ...data.addressBook });
  //   }
  // }

  // function checkSelection(data) {
  //   // console.log('check');
  //   data = data ? data : addressBook;
  //   if (selectable.state) {
  //     if (!selectedAddress.initialized) {
  //       window.setTimeout(checkSelection, 100);
  //     } else {
  //       console.log('initialized');
  //       let addressId =
  //         title.toLowerCase() == 'shipping'
  //           ? selectedAddress.shippingAddress
  //           : selectedAddress.billingAddress;
  //       let result = data.book.filter((address) => address._id === addressId);

  //       if (result.length == 0) {
  //         addressId =
  //           title.toLowerCase() == 'shipping'
  //             ? data.defaultShippingAddress
  //             : data.defaultBillingAddress;

  //         console.log('shipping selected not present:', addressId);
  //         setAddressSelection({ id: addressId ? addressId : null });
  //       } else {
  //         setAddressSelection({ id: result[0]._id });
  //       }
  //     }
  //   }
  // }

  // function setAddressSelection({ id }) {
  //   let type = '';
  //   if (title.toLowerCase() == 'shipping') {
  //     type = 'ADD_SHIPPING_ADDRESS';
  //   } else if (title.toLowerCase() == 'billing') {
  //     type = 'ADD_BILLING_ADDRESS';
  //   }
  //   dispatch({
  //     type: type,
  //     payload: { id: id },
  //   });
  // }

  // useEffect(() => {
  //   let fetchAddress = async () => await getAddress();
  //   setSelect(views.loading);
  //   // if (selectable.state && !selectedAddress.initialized) {
  //   //   console.log('loop');
  //   //   window.setTimeout(fetchAddress, 100);
  //   // } else {
  //   fetchAddress();
  //   // }
  // }, []);

  // useEffect(() => {
  //   console.log('book', addressBook);
  //   render();
  // }, [addressBook]);
}

// const { state, dispatch } = useContext(Store);
// // const [initialize, setInitialize] = useState(false);

// useEffect(() => {
//   // const {
//   //   addressBook: { shippingAddress },
//   // } = state;

//   const {
//     addressBook: { shippingAddress, billingAddress },
//   } = state;

//   console.log('INITIAL:', shippingAddress, billingAddress);
// }, [state]);

// const [addressBook, setAddressBook] = useState({
//   book: [],
//   defaultShippingAddress: null,
//   defaultBillingAddress: null,
// });

// function handleAddressSelect({ id }) {
//   console.log('calling set');

//   // selectionState.set(id);
//   // console.log('AddressBook:selected :', id);
//   // selection.selected = id;
//   selection.set(id);
// }
// async function getAddress() {
//   //console.log('get address called');
//   const { data } = await axios.get('/api/user/account/address/addressbook');

//   if (data.errors) {
//     console.log(data.errors);
//   } else {
//     //console.log('get address called: data');

//     if (selectable) {
//       //console.log('get address called:selectable');

//       if (!selection.selected() && selection.initial()) {
//         //console.log('get address called:initial');

//         let found = data.addressBook.book.filter((address) => {
//           //console.log(address._id, selection.initial());
//           return address._id === selection.initial();
//         });

//         console.log('found', found);
//         if (found.length !== 0) {
//           selection.set(found[0]._id);
//         } else {
//           selection.initial('reset');
//         }
//       }
//     }
//     setAddressBook({ ...addressBook, ...data.addressBook });
//   }
// }

// const [addressGrid, setAddressGrid] = useState();

// function render() {
//   let grid = '';
//   if (addressBook.book.length === 0) {
//     grid = <h3>No Address Found</h3>;
//   } else {
//     grid = (
//       <Grid gap={'1rem'}>
//         {addressBook.book.map((address, i) => {
//           let defaultShippingAddress =
//             address._id === addressBook.defaultShippingAddress;
//           let defaultBillingAddress =
//             address._id === addressBook.defaultBillingAddress;

//           let selected = false;
//           if (selectable) {
//             if (selection.selected()) {
//               selected = address._id === selection.selected();
//             } else {
//               selected =
//                 title.toLowerCase() == 'shipping'
//                   ? defaultShippingAddress
//                   : defaultBillingAddress;

//               if (selected) {
//                 handleAddressSelect({ id: address._id });
//               }
//             }
//           }
//           return (
//             <AddressCard
//               key={`${address._id}-address-book-grid-${title}-${i}`}
//               data={address}
//               title={title}
//               selectable={selectable}
//               selected={selected}
//               handleSelect={handleAddressSelect}
//               deleteHandler={deleteAddressHandler}
//               editClickHandler={editClickHandler}
//               defaultShippingAddress={defaultShippingAddress}
//               defaultBillingAddress={defaultBillingAddress}
//               defaultHandler={setDefaultAddressHandler}
//             />
//           );
//         })}
//       </Grid>
//     );
//   }
//   setAddressGrid(grid);
// }

// useEffect(() => {
//   setSelect(views.addressGrid);
// }, []);

// useEffect(() => {
//   render();
// }, [addressBook]);

// useEffect(async () => {
//   await getAddress();
// }, [selection.initial()]);

// function handleAddressFormClick(type) {
//   switch (type) {
//     case 'update':
//       console.log('Update');
//       getAddress();
//       setSelect(views.addressGrid);
//       break;
//     case 'cancel':
//       console.log('cancel');
//       setSelect(views.addressGrid);
//       break;
//   }
// }
// const [updateItemData, setUpdateItemData] = useState({});

// function editClickHandler(data) {
//   setUpdateItemData({ ...updateItemData, ...data });
//   setSelect(views.updateAddress);
// }

// async function deleteAddressHandler(id) {
//   const { data } = await axios.delete(
//     `/api/user/account/address/delete/${id}`
//   );
//   if (data.errors) {
//     console.log(data.errors);
//   } else {
//     getAddress();
//   }
// }

// async function setDefaultAddressHandler(fields) {
//   const { data } = await axios.put(
//     `/api/user/account/address/setdefault`,
//     fields
//   );
//   if (data.errors) {
//     console.log(data.errors);
//   } else {
//     getAddress();
//   }
// }

//   function render() {
//     let grid = '';

//     if (addressBook.book.length == 0) {
//       grid = <h4>No Address Found</h4>;
//     } else {
//       let found = false;
//       grid = (
//         <Grid gap={'1rem'}>
//           {addressBook.book.map((address, i) => {
//             let defaultShippingAddress =
//               address._id === addressBook.defaultShippingAddress;
//             let defaultBillingAddress =
//               address._id === addressBook.defaultBillingAddress;

//             let selected = false;
//             if (selectable && selection) {
//               if (selection.selected()) {
//                 selected =
//                   address._id === selection.selected().replaceAll('"', '');
//               } else {
//                 selected =
//                   title.toLowerCase() == 'shipping'
//                     ? defaultShippingAddress
//                     : defaultBillingAddress;

//                 if (selected) {
//                   found = true;
//                   // console.log('calling set');

//                   handleAddressSelect({ id: address._id });
//                 }
//               }
//             }
//             return (
//               <AddressCard
//                 key={`${address._id}-address-book-grid-${title}-${i}`}
//                 data={address}
//                 title={title}
//                 selectable={selectable}
//                 selected={selected}
//                 handleSelect={handleAddressSelect}
//                 deleteHandler={deleteAddressHandler}
//                 editClickHandler={editClickHandler}
//                 defaultShippingAddress={defaultShippingAddress}
//                 defaultBillingAddress={defaultBillingAddress}
//                 defaultHandler={setDefaultAddressHandler}
//               />
//             );
//           })}
//         </Grid>
//       );
//     }

//     setAddressGrid(grid);
//   }

//   useEffect(async () => {
//     await getAddress();
//     setSelect(views.addressGrid);

//     // console.log('selected:', selection.selected());
//     // if (selection.selected) {
//     //   let result = addressBook.book.filter((address) => {
//     //     let result = address._id === selection.selected().replaceAll('"', '');
//     //     console.log('result:', result, address._id, selection.selected());
//     //     return result;
//     //   });
//     //   if (result.length == 0) {
//     //     console.log('0 result--', result);
//     //   }
//     // }
//   }, []);

//   useEffect(() => {
//     render();
//     // console.log('rendering:', selection.selected());
//     // console.log('selected:', selection.selected());

//     // if (addressBook.book.length != 0) {
//     //   if (!selection.found) {
//     //     selection.notFound();
//     //   }
//     // }
//   }, [addressBook, selection.selected()]);

//   // useEffect(() => {
//   //   // console.log('view:', selection.selected());
//   //   console.log('data get address', selection.initial(), addressBook);
//   // }, [selection.initial()]);

// export default function AddressBook({
//   title = 'AddressBook',
//   add,
//   selectable,
//   selection = {
//     initial: () => {},
//     set: () => {},
//     notFound: () => {},
//     selected: () => {},
//   },
//   // selectionState: { set = () => {}, get = () => {} },
// }) {
//   const views = {
//     addressGrid: 'addressGrid',
//     updateAddress: 'updateAddress',
//     loading: 'Loading',
//   };

//   const [select, setSelect] = useState(views.loading);

//   const [addressBook, setAddressBook] = useState({
//     book: [],
//     defaultShippingAddress: null,
//     defaultBillingAddress: null,
//   });

//   const [addressGrid, setAddressGrid] = useState();

//   async function getAddress() {
//     const { data } = await axios.get('/api/user/account/address/addressbook');

//     if (data.errors) {
//       console.log(data.errors);
//     } else {
//       // console.log('data get address', selection.selected());
//       if (selection.selected()) {
//         let found = data.addressBook.book.filter((address) => {
//           let result = address._id === selection.selected();
//           console.log('result', result);
//           return result;
//         });
//       }
//       setAddressBook({ ...addressBook, ...data.addressBook });
//     }
//   }

//   async function deleteAddressHandler(id) {
//     const { data } = await axios.delete(
//       `/api/user/account/address/delete/${id}`
//     );
//     if (data.errors) {
//       console.log(data.errors);
//     } else {
//       getAddress();
//     }
//   }

//   function handleAddressSelect({ id }) {
//     console.log('calling set');

//     // selectionState.set(id);
//     // console.log('AddressBook:selected :', id);
//     // selection.selected = id;
//     // selection.set(id);
//   }

//   const [updateItemData, setUpdateItemData] = useState({});
//   function editClickHandler(data) {
//     setUpdateItemData({ ...updateItemData, ...data });
//     setSelect(views.updateAddress);
//   }

//   async function setDefaultAddressHandler(fields) {
//     const { data } = await axios.put(
//       `/api/user/account/address/setdefault`,
//       fields
//     );
//     if (data.errors) {
//       console.log(data.errors);
//     } else {
//       getAddress();
//     }
//   }

//   function handleAddressFormClick(type) {
//     switch (type) {
//       case 'update':
//         console.log('Update');
//         getAddress();
//         setSelect(views.addressGrid);
//         break;
//       case 'cancel':
//         console.log('cancel');
//         setSelect(views.addressGrid);
//         break;
//     }
//   }

//   function render() {
//     let grid = '';

//     if (addressBook.book.length == 0) {
//       grid = <h4>No Address Found</h4>;
//     } else {
//       let found = false;
//       grid = (
//         <Grid gap={'1rem'}>
//           {addressBook.book.map((address, i) => {
//             let defaultShippingAddress =
//               address._id === addressBook.defaultShippingAddress;
//             let defaultBillingAddress =
//               address._id === addressBook.defaultBillingAddress;

//             let selected = false;
//             if (selectable && selection) {
//               if (selection.selected()) {
//                 selected =
//                   address._id === selection.selected().replaceAll('"', '');
//               } else {
//                 selected =
//                   title.toLowerCase() == 'shipping'
//                     ? defaultShippingAddress
//                     : defaultBillingAddress;

//                 if (selected) {
//                   found = true;
//                   // console.log('calling set');

//                   handleAddressSelect({ id: address._id });
//                 }
//               }
//             }
//             return (
//               <AddressCard
//                 key={`${address._id}-address-book-grid-${title}-${i}`}
//                 data={address}
//                 title={title}
//                 selectable={selectable}
//                 selected={selected}
//                 handleSelect={handleAddressSelect}
//                 deleteHandler={deleteAddressHandler}
//                 editClickHandler={editClickHandler}
//                 defaultShippingAddress={defaultShippingAddress}
//                 defaultBillingAddress={defaultBillingAddress}
//                 defaultHandler={setDefaultAddressHandler}
//               />
//             );
//           })}
//         </Grid>
//       );
//     }

//     setAddressGrid(grid);
//   }

//   useEffect(async () => {
//     await getAddress();
//     setSelect(views.addressGrid);

//     // console.log('selected:', selection.selected());
//     // if (selection.selected) {
//     //   let result = addressBook.book.filter((address) => {
//     //     let result = address._id === selection.selected().replaceAll('"', '');
//     //     console.log('result:', result, address._id, selection.selected());
//     //     return result;
//     //   });
//     //   if (result.length == 0) {
//     //     console.log('0 result--', result);
//     //   }
//     // }
//   }, []);

//   useEffect(() => {
//     render();
//     // console.log('rendering:', selection.selected());
//     // console.log('selected:', selection.selected());

//     // if (addressBook.book.length != 0) {
//     //   if (!selection.found) {
//     //     selection.notFound();
//     //   }
//     // }
//   }, [addressBook, selection.selected()]);

//   // useEffect(() => {
//   //   // console.log('view:', selection.selected());
//   //   console.log('data get address', selection.initial(), addressBook);
//   // }, [selection.initial()]);
//   return (
//     <ViewSelector select={select}>
//       <View name={views.addressGrid}>
//         <div>
//           {addressGrid}
//           <button
//             onClick={() => {
//               add();
//             }}
//           >
//             Add
//           </button>
//         </div>
//       </View>
//       <View name={views.updateAddress}>
//         <AddressFormView
//           task={'update'}
//           updateItemData={updateItemData}
//           cancel={() => handleAddressFormClick('cancel')}
//           updated={() => handleAddressFormClick('update')}
//           totalAddresses={10}
//         />
//       </View>
//       <View name={views.loading}>
//         <Loading />
//       </View>
//     </ViewSelector>
//   );
// }
