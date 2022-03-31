import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AddressBookView from '../Address/AddressBookView';
import { Store } from '../../../utils/store';

export default function Billing({ back, next }) {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [initialSelected, setInitialSelected] = useState(null);

  useEffect(() => {
    const {
      addressBook: { billingAddress },
    } = state;

    console.log('billingAddress-context:', billingAddress);
    setInitialSelected(billingAddress);
  }, [state]);

  // function handleStatus() {
  //   console.log('shipping status');
  // }

  function handleSelection(type, id) {
    console.log(type);
    switch (type) {
      case 'set': {
        // console.log('Shipping-set', id);
        setSelectedBilling(id);
        dispatch({
          type: 'ADD_BILLING_ADDRESS',
          payload: { id: id },
        });
        break;
      }
      case 'notFound': {
        // setSelectedShipping(null);
        // dispatch({
        //   type: 'ADD_SHIPPING_ADDRESS',
        //   payload: { id: null },
        // });
        console.log('triggering');
        break;
      }
    }
  }
  return (
    <div>
      <h1>Billing Address</h1>
      <AddressBookView
        title={'Billing'}
        selectable
        selection={{
          initial: () => initialSelected,
          set: (id) => handleSelection('set', id),
          notFound: () => handleSelection('notFound'),
          selected: () => selectedBilling,
        }}
        // status={handleStatus}
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

// import React, { useState, useEffect, useContext } from 'react';
// import { useRouter } from 'next/router';
// import AddressBookView from '../Address/AddressBookView';
// import { Store } from '../../../utils/store';

// export default function Billing({ back, next }) {
//   const router = useRouter();

//   const { state, dispatch } = useContext(Store);
//   const [selectedBilling, setSelectedBilling] = useState(null);

//   useEffect(() => {
//     const {
//       addressBook: { billingAddress },
//     } = state;

//     setSelectedBilling(billingAddress);
//   }, [state]);

//   // function handleStatus() {
//   //   console.log('shipping status');
//   // }

//   function handleSelection(type, id) {
//     console.log(type);
//     switch (type) {
//       case 'set': {
//         // console.log('Shipping-set', id);
//         setSelectedBilling(id);
//         dispatch({
//           type: 'ADD_BILLING_ADDRESS',
//           payload: { id: id },
//         });
//         break;
//       }
//       case 'notFound': {
//         setSelectedBilling(null);
//         dispatch({
//           type: 'ADD_BILLING_ADDRESS',
//           payload: { id: null },
//         });
//         break;
//       }
//     }
//   }
//   return (
//     <div>
//       <h1>Billing Address</h1>
//       <AddressBookView
//         title={'Billing'}
//         selectable
//         selection={{
//           set: (id) => handleSelection('set', id),
//           notFound: () => handleSelection('notFound'),
//           selected: () => selectedBilling,
//         }}
//       />
//       <button
//         onClick={() => {
//           back();
//         }}
//       >
//         back
//       </button>
//       <button
//         onClick={() => {
//           if (selectedBilling) {
//             next();
//           } else {
//             console.log('error', 'Please select a Billing address');
//           }
//         }}
//       >
//         next
//       </button>
//     </div>
//   );
// }

// import React, { useState, useEffect, useContext } from 'react';
// import { useRouter } from 'next/router';
// import AddressBookView from '../Address/AddressBookView';
// import { Store } from '../../../utils/store';

// export default function Billing({ back, next }) {
//   const router = useRouter();

//   const { state, dispatch } = useContext(Store);
//   const [selectedBilling, setSelectedBilling] = useState(null);

//   useEffect(() => {
//     const {
//       addressBook: { billingAddress },
//     } = state;

//     setSelectedBilling(billingAddress);
//   }, [state]);

//   function handleSelection(id, type) {
//     switch (type) {
//       case 'set':
//         console.log('Billing-set', id);
//         setSelectedBilling(id);
//         dispatch({
//           type: 'ADD_BILLING_ADDRESS',
//           payload: { id: id },
//         });
//         break;
//     }
//   }
//   return (
//     <div>
//       <h1>Billing Address</h1>
//       <AddressBookView
//         title={'Billing'}
//         selectable
//         selection={{
//           set: (id) => handleSelection(id, 'set'),
//           selected: selectedBilling,
//         }}
//         // status={handleStatus}
//       />
//       <button
//         onClick={() => {
//           back();
//         }}
//       >
//         back
//       </button>
//       <button
//         onClick={() => {
//           if (selectedBilling) {
//             next();
//           } else {
//             console.log('error', 'Please select a billing address');
//           }
//         }}
//       >
//         next
//       </button>
//     </div>
//   );
// }
