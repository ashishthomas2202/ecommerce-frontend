import { createContext, useReducer } from 'react';
import LocalStorage from './localStorage';

export const Store = createContext();

const initialState = {
  darkMode: false,
  shoppingBag: {
    initialize: function () {
      let bagItems = LocalStorage.getItem('bagItems');
      this.bagItems = bagItems ? JSON.parse(bagItems) : [];

      this.bagItems.forEach((item) => {
        this.totalItems += item.quantity;
      });
    },
    bagItems: [],
    totalItems: 0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case 'BAG_ADD_ITEM': {
      let itemAdded = false;
      let newItem = action.payload;
      let bagItems = initialState.shoppingBag.bagItems;
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

      return {
        ...state,
        shoppingBag: { ...state.shoppingBag, bagItems, totalItems },
      };
    }

    case 'BAG_UPDATE_ITEM': {
      let updateItem = action.payload;
      let bagItems = initialState.shoppingBag.bagItems;
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

      return {
        ...state,
        shoppingBag: { ...state.shoppingBag, bagItems, totalItems },
      };
    }

    // case 'BAG_REMOVE_ITEM': {
    //   // let itemRemoved = false;
    //   let itemToRemove = action.payload;
    //   let bagItems = initialState.shoppingBag.bagItems;
    //   let totalItems = 0;

    //   bagItems.map((item) => {
    //     if (item._id === itemToRemove._id) {
    //       item.quantity -= newItem.quantity;
    //       itemAdded = true;
    //     }
    //   });

    //   if (!itemAdded) {
    //     bagItems.push(newItem);
    //   }

    //   bagItems.forEach((item) => {
    //     totalItems += item.quantity;
    //   });

    //   LocalStorage.setItem('bagItems', JSON.stringify(bagItems));

    //   return {
    //     ...state,
    //     shoppingBag: { ...state.shoppingBag, bagItems, totalItems },
    //   };
    // }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
