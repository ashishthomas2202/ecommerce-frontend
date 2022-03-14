import React, { useEffect, useState, useContext } from 'react';
import {
  Table,
  TableHeading,
  TableBody,
  TableData,
} from '../Basic/Table/Table';
import Link from 'next/link';
import Select from '../Basic/Select/Select';
import { Store } from '../../../utils/store';

export default function ShoppingBagList() {
  const { state, dispatch } = useContext(Store);

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

  // function handleItemRemoval(item) {}
  function handleQuantityChange(item, quantity) {
    console.log(item.name, quantity);

    dispatch({
      type: 'BAG_UPDATE_ITEM',
      payload: {
        _id: item._id,
        name: item.name,
        slug: item.slug,
        image: item.image,
        sellingPrice: item.sellingPrice,
        stickerPrice: item.stickerPrice,
        quantity: quantity,
        stock: item.stock,
      },
    });
  }

  return (
    <div>
      {shoppingBag.totalItems === 0 ? (
        <h1>Bag is empty</h1>
      ) : (
        <Table>
          <TableHeading
            headings={['Image', 'Name', 'Quantity', 'Price', 'Total', 'Action']}
          />
          <TableBody>
            {shoppingBag.bagItems.map((item, i) => (
              <TableData
                key={'TableDataEntry' + item._id + item.name}
                // link={`/product/${item.slug}`}
                data={[
                  <Link
                    key={'TableDataEntryImageLink-shoppingBag' + i}
                    href={`/product/${item.slug}`}
                    passHref
                  >
                    <img
                      style={{ cursor: 'pointer' }}
                      src={item.image.path}
                      alt={item.name}
                      height="50"
                    />
                  </Link>,
                  <Link
                    key={'TableDataEntryProductNameLink-shoppingBag' + i}
                    href={`/product/${item.slug}`}
                    passHref
                  >
                    <span style={{ cursor: 'pointer' }}>{item.name}</span>
                  </Link>,
                  <Select
                    key={'TableDataEntryProductSelectQuantity-shoppingBag' + i}
                    name="quantity"
                    options={item.stock}
                    selected={item.quantity}
                    onChangeFunction={(quantity) =>
                      handleQuantityChange(item, Number(quantity))
                    }
                  />,
                  item.sellingPrice,
                  Math.floor(item.quantity * item.sellingPrice * 100) / 100,
                  <button
                    key={'TableDataEntryRemoveButtob-shoppingBag' + i}
                    // onClick={(item) => {
                    //   handleItemRemoval(item.id);
                    // }}
                  >
                    x
                  </button>,
                ]}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
