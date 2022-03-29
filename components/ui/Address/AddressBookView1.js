import React from 'react';
// import Button from '../Basic/Button/Button';
// import Grid from '../Basic/Grid/Grid';
// import AddressFormView from './AddressFormView';
// import AddressCard from './AddressCard/AddressCard';

// const ACTION_TYPE = {

// }
// const initialState = {
//   selectable: false,
//   // view:{main:}
// };

export default function AddressBookView({}) {
  return <p>Address Book</p>;
}

// import axios from 'axios';
// import React, { useState, useEffect, useReducer } from 'react';
// import Button from '../Basic/Button/Button';
// import Grid from '../Basic/Grid/Grid';
// import AddressFormView from './AddressFormView';
// import AddressCard from './AddressCard/AddressCard';

// export default function AddressBook({
//   title = 'AddressBook',
//   selectable,
//   selectionType,
//   selectionState = { get() {}, set() {}, found: false },
//   next,
//   back,
// }) {
//   // To store the view of the component - book,selectable, add, update, loading
//   const [view, setView] = useState({
//     main: selectable ? 'selectable' : 'book',
//     current: 'loading',
//   });

//   // To store the addressBook data
//   const [addressBook, setAddressBook] = useState({
//     book: [],
//     defaultShippingAddress: null,
//     defaultBillingAddress: null,
//   });

//   // function to fetch the addressBook data from the database
//   async function getAddressBook() {
//     const { data } = await axios.get('/api/user/account/address/addressbook');
//     //Error
//     if (data.errors) {
//       console.log(data.errors);
//     }
//     //addressBook Found
//     else {
//       if (data.addressBook) {
//         setAddressBook({
//           ...addressBook,
//           ...data.addressBook,
//         });
//         setView({ ...view, current: view.main });
//         return data.addressBook;
//       }
//     }
//   }

//   async function deleteAddressHandler(id) {
//     const { data } = await axios.delete(
//       `/api/user/account/address/delete/${id}`
//     );
//     if (data.errors) {
//       console.log(data.errors);
//     } else {
//       getAddressBook();
//     }
//   }

//   const [updateItemData, setupdateItemData] = useState();

//   function editClickHandler(data) {
//     setupdateItemData(data);
//     setView({ ...view, current: 'update' });
//   }

//   async function setDefaultAddressHandler(fields) {
//     const { data } = await axios.put(
//       `/api/user/account/address/setdefault`,
//       fields
//     );
//     if (data.errors) {
//       console.log(data.errors);
//     } else {
//       getAddressBook();
//     }
//   }

//   function handleAddressSelect({ id, currentItem }) {
//     selectionState.set(id);
//   }

//   useEffect(async () => {
//     await getAddressBook().then((addressBook) => {
//       if (selectable) {
//         if (!selectionState.get() || !selectionState.found) {
//           selectionState.set(
//             selectionType == 'shipping'
//               ? addressBook.defaultShippingAddress
//                 ? addressBook.defaultShippingAddress
//                 : addressBook.book[0] && addressBook.book[0]._id
//               : addressBook.defaultBillingAddress
//               ? addressBook.defaultBillingAddress
//               : addressBook.book[0] && addressBook.book[0]._id
//           );
//         }
//       }
//     });
//   }, []);

//   switch (view.current) {
//     case 'book': {
//       return (
//         <>
//           <h2>{title}</h2>
//           {addressBook.book.length === 0 ? (
//             <h4>No Address Found</h4>
//           ) : (
//             <Grid data={addressBook.book} column={3} gap={'1rem'}>
//               {addressBook.book.map((address, i) => {
//                 let defaultShippingAddress =
//                   address._id === addressBook.defaultShippingAddress;
//                 let defaultBillingAddress =
//                   address._id === addressBook.defaultBillingAddress;
//                 return (
//                   <AddressCard
//                     key={`${address._id}-address-book-grid-${title}-${i}`}
//                     data={address}
//                     deleteHandler={deleteAddressHandler}
//                     editClickHandler={editClickHandler}
//                     defaultShippingAddress={defaultShippingAddress}
//                     defaultBillingAddress={defaultBillingAddress}
//                     defaultHandler={setDefaultAddressHandler}
//                   />
//                 );
//               })}
//             </Grid>
//           )}

//           <Button
//             label={'Add Address'}
//             onClickHandler={() => {
//               setView({ ...view, current: 'add' });
//             }}
//           />
//         </>
//       );
//       break;
//     }
//     case 'selectable': {
//       return (
//         <>
//           <h2>{title}</h2>
//           {addressBook.book.length === 0 ? (
//             <>
//               {' '}
//               <h4>No Address Found</h4>
//               <Button
//                 label={'Add Address'}
//                 onClickHandler={() => {
//                   setView({ ...view, current: 'add' });
//                 }}
//               />
//             </>
//           ) : (
//             <>
//               <Grid data={addressBook.book} column={3} gap={'1rem'}>
//                 {addressBook.book.map((address, i) => {
//                   let defaultShippingAddress =
//                     address._id === addressBook.defaultShippingAddress;
//                   let defaultBillingAddress =
//                     address._id === addressBook.defaultBillingAddress;

//                   let selected = selectionState.get() === address._id;
//                   if (!selectionState.found && selected) {
//                     selectionState.found = true;
//                   }

//                   return (
//                     <AddressCard
//                       key={`${address._id}-address-book-grid-${title}-${i}`}
//                       data={address}
//                       deleteHandler={deleteAddressHandler}
//                       editClickHandler={editClickHandler}
//                       defaultShippingAddress={defaultShippingAddress}
//                       defaultBillingAddress={defaultBillingAddress}
//                       defaultHandler={setDefaultAddressHandler}
//                       selectable={true}
//                       selected={selected}
//                       handleSelect={handleAddressSelect}
//                     />
//                   );
//                 })}
//               </Grid>
//               <Button
//                 label={'Add Address'}
//                 onClickHandler={() => {
//                   setView({ ...view, current: 'add' });
//                 }}
//               />
//             </>
//           )}

//           {back && (
//             <Button
//               label={'Back'}
//               onClickHandler={() => {
//                 back();
//               }}
//             />
//           )}

//           {next && (
//             <Button
//               label={'Next'}
//               onClickHandler={() => {
//                 if (selectionState.get()) {
//                   next();
//                 } else {
//                   console.log('Not Selected');
//                 }
//               }}
//             />
//           )}
//         </>
//       );
//     }
//     case 'add': {
//       return (
//         <AddressFormView
//           cancel={() => {
//             setView({ ...view, current: view.main });
//           }}
//           added={() => {
//             setView({ ...view, current: 'loading' });
//             getAddressBook();
//           }}
//           totalAddresses={addressBook.book.length}
//         />
//       );
//     }

//     case 'update': {
//       return (
//         <AddressFormView
//           task="update"
//           cancel={() => {
//             setView({ ...view, current: view.main });
//           }}
//           updateItemData={updateItemData}
//           updated={() => {
//             setView({ ...view, current: 'loading' });
//             getAddressBook();
//           }}
//           totalAddresses={addressBook.book.length}
//         />
//       );
//     }
//     case 'loading': {
//       return <div>Loading...</div>;
//     }
//     default: {
//       return <h3>Unable to load</h3>;
//     }
//   }
// }
