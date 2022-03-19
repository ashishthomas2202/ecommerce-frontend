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
import { useRouter } from 'next/router';
import { User } from '../../../utils/settings';

export default function ShoppingBagList() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const [shoppingBag, setShoppingBag] = useState({
    bagItems: [],
    totalItems: 0,
  });

  let Subtotal = 0;

  useEffect(() => {
    const {
      shoppingBag: { bagItems, totalItems },
    } = state;

    setShoppingBag({
      bagItems,
      totalItems,
    });
  }, [state]);

  function handleItemRemoval(item) {
    dispatch({
      type: 'BAG_REMOVE_ITEM',
      payload: { ...item },
    });
    router.push('/shoppingBag');
  }
  function handleQuantityChange(item, quantity) {
    dispatch({
      type: 'BAG_UPDATE_ITEM',
      payload: {
        ...item,
        quantity,
      },
    });
  }
  function handleCheckout() {
    router.push(User.shipping.link);
  }

  return (
    <div>
      {shoppingBag.totalItems == 0 ? (
        <h1>Bag is empty</h1>
      ) : (
        <div>
          <Table>
            <TableHeading
              headings={['Image', 'Name', 'Quantity', 'Price', 'Action']}
            />
            <TableBody>
              {shoppingBag.bagItems.map((item, i) => {
                Subtotal += item.quantity * item.sellingPrice;

                return (
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
                          height="100"
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
                        key={
                          'TableDataEntryProductSelectQuantity-shoppingBag' + i
                        }
                        name="quantity"
                        options={item.stock}
                        selected={item.quantity}
                        onChangeFunction={(quantity) =>
                          handleQuantityChange(item, Number(quantity))
                        }
                      />,
                      item.sellingPrice,
                      <button
                        key={'TableDataEntryRemoveButtob-shoppingBag' + i}
                        onClick={() => {
                          handleItemRemoval(item);
                        }}
                      >
                        x
                      </button>,
                    ]}
                  />
                );
              })}
            </TableBody>
          </Table>
          <div>
            Subtotal:{Number(Math.round(Subtotal * 100) / 100).toFixed(2)}
          </div>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}
