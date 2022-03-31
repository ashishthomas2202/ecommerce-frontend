import { createContext, useReducer } from 'react';
import LocalStorage from './localStorage';

export const Store = createContext();

const initialState = {
  darkMode: false,
  shoppingBag: {
    bagItems: LocalStorage.getItem('bagItems')
      ? JSON.parse(LocalStorage.getItem('bagItems'))
      : [],
    totalItems: LocalStorage.getItem('totalItems')
      ? JSON.parse(LocalStorage.getItem('totalItems'))
      : 0,
  },
  // userInfo: LocalStorage.getItem('userInfo')
  //   ? JSON.parse(LocalStorage.getItem('userInfo'))
  //   : null,
  addressBook: {
    shippingAddress: LocalStorage.getItem('shippingAddress')
      ? LocalStorage.getItem('shippingAddress')
      : '',
    billingAddress: LocalStorage.getItem('billingAddress')
      ? LocalStorage.getItem('billingAddress')
      : '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case 'ADD_SHIPPING_ADDRESS': {
      let data = action.payload.id;
      if (data) {
        LocalStorage.setItem('shippingAddress', JSON.stringify(data));
      } else {
        LocalStorage.removeItem('shippingAddress');
      }
      return {
        ...state,
        addressBook: { ...state.addressBook, shippingAddress: data },
      };
    }
    case 'ADD_BILLING_ADDRESS': {
      let data = action.payload.id;
      if (data) {
        LocalStorage.setItem('billingAddress', JSON.stringify(data));
      } else {
        LocalStorage.removeItem('billingAddress');
      }
      return {
        ...state,
        addressBook: { ...state.addressBook, billingAddress: data },
      };
    }
    case 'BAG_ADD_ITEM': {
      let itemAdded = false;
      let newItem = action.payload;
      let bagItems = state.shoppingBag.bagItems;
      let totalItems = 0;

      bagItems.map((item) => {
        if (item._id === newItem._id) {
          item.quantity += newItem.quantity;
          itemAdded = true;
        }
      });

      if (!itemAdded) {
        bagItems.push(newItem);
      }

      bagItems.forEach((item) => {
        totalItems += item.quantity;
      });

      LocalStorage.setItem('bagItems', JSON.stringify(bagItems));
      LocalStorage.setItem('totalItems', JSON.stringify(totalItems));

      return {
        ...state,
        shoppingBag: { ...state.shoppingBag, bagItems, totalItems },
      };
    }
    case 'BAG_UPDATE_ITEM': {
      let updateItem = action.payload;
      let bagItems = state.shoppingBag.bagItems;
      let totalItems = 0;

      bagItems.map((item) => {
        if (item._id === updateItem._id) {
          item.quantity = updateItem.quantity;
        }
      });

      bagItems.forEach((item) => {
        totalItems += item.quantity;
      });

      LocalStorage.setItem('bagItems', JSON.stringify(bagItems));
      LocalStorage.setItem('totalItems', JSON.stringify(totalItems));

      return {
        ...state,
        shoppingBag: { ...state.shoppingBag, bagItems, totalItems },
      };
    }
    case 'BAG_REMOVE_ITEM': {
      let removeItem = action.payload;
      let bagItems = state.shoppingBag.bagItems;
      let totalItems = 0;

      bagItems = bagItems.filter((item) => item._id !== removeItem._id);

      bagItems.forEach((item) => {
        totalItems += item.quantity;
      });

      LocalStorage.setItem('bagItems', JSON.stringify(bagItems));
      LocalStorage.setItem('totalItems', JSON.stringify(totalItems));

      return {
        ...state,
        shoppingBag: { ...state.shoppingBag, bagItems, totalItems },
      };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
