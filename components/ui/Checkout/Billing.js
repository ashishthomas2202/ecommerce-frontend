import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AddressBookView from '../Address/AddressBookView';
import { Store } from '../../../utils/store';

export default function Billing({ back, next }) {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const [selectedBilling, setSelectedBilling] = useState(null);

  useEffect(() => {
    const {
      addressBook: { billingAddress },
    } = state;

    setSelectedBilling(billingAddress);
  }, [state]);

  function handleSelection(id, type) {
    switch (type) {
      case 'set':
        // console.log('Billing-set', id);
        setSelectedBilling(id);
        dispatch({
          type: 'ADD_BILLING_ADDRESS',
          payload: { id: id },
        });
        break;
    }
  }
  return (
    <div>
      <h1>Billing Address</h1>
      <AddressBookView
        title={'Billing'}
        selectable
        selection={{
          set: (id) => handleSelection(id, 'set'),
          selected: selectedBilling,
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

// import React from 'react';
// import { useRouter } from 'next/router';
// import AddressBookView from '../Address/AddressBookView';

// export default function Billing({ back, status, next }) {
//   const router = useRouter();

//   return (
//     <div>
//       <h1>Billing</h1>
//       <AddressBookView />

//       <button
//         onClick={() => {
//           back();
//         }}
//       >
//         back
//       </button>
//       <button
//         onClick={() => {
//           next();
//         }}
//       >
//         next
//       </button>
//     </div>
//   );
// }
