import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
// import Table from '../Basic/Table';
import { Store } from '../../../utils/store';

export default function ShoppingBagList() {
  const { state } = useContext(Store);
  const [shoppingBag, setShoppingBag] = useState({
    bagItems: [],
    totalItems: 0,
  });

  useEffect(() => {
    const {
      shoppingBag: { bagItems, totalItems },
    } = state;

    setShoppingBag({
      bagItems,
      totalItems,
    });
  }, [state]);

  //   const data = [
  //     shoppingBag.bagItems.map((item, i) => {
  //       return { image: item.image.path, name: item.name };
  //     }),
  //   ];
  return (
    <div>
      {shoppingBag.totalItems === 0 ? (
        <h1>Bag is empty</h1>
      ) : (
        shoppingBag.bagItems.map((item, i) => {
          return (
            <Link
              key={'shoppingBagItem' + item.name + i}
              href={`/product/${item.slug}`}
              passHref
            >
              <div>
                <img src={item.image.path} alt={item.image.name} height="160" />
                <h4>{item.name}</h4>
                <h6>{item.quantity}</h6>
                <h6>{item.stickerPrice}</h6>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
