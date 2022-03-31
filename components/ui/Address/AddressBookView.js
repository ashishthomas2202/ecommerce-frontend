import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import { ViewSelector, View } from '../Basic/View/View';
import AddressBook from './AddressBook';
import AddressFormView from './AddressFormView';

export default function AddressBookView({
  title = 'AddressBookView',
  selectable,
  selection = {
    initial: () => {},
    set: () => {},
    notFound: () => {},
    selected: () => {},
  },
}) {
  const views = {
    addressBook: 'addressBook',
    addAddress: 'addAddress',
  };

  function handleAddressBookClick(type) {
    switch (type) {
      case 'add':
        setSelect(views.addAddress);
        break;
      // case 'added':
      //   setSelect(views.addressBook);
    }
  }

  function handleAddressFormClick(type) {
    switch (type) {
      case 'cancel':
        setSelect(views.addressBook);
        break;
      case 'added':
        setSelect(views.addressBook);
        break;
    }
  }

  const [select, setSelect] = useState(views.addressBook);

  return (
    <ViewSelector select={select}>
      <View name={views.addressBook}>
        <AddressBook
          title={title}
          add={() => handleAddressBookClick('add')}
          selectable={selectable}
          selection={{
            initial: (value) => selection.initial(value),
            set: (id) => selection.set(id),
            notFound: () => selection.notFound(),
            selected: () => selection.selected(),
          }}
        />
      </View>
      <View name={views.addAddress}>
        <AddressFormView
          cancel={() => handleAddressFormClick('cancel')}
          added={() => handleAddressFormClick('added')}
          totalAddresses={10}
        />
      </View>
    </ViewSelector>
  );
}
