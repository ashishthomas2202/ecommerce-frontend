import React, { useContext, useState } from 'react';
import style from './ProductContent.module.scss';
import { Store } from '../../../../utils/store';
import { useRouter } from 'next/router';
import Select from '../../Basic/Select/Select';
import ErrorHandler from '../../../Main/Error/ErrorHandler';

export default function ProductContent({ product }) {
  const [error, setError] = useState({ err: false, message: '' });
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const [quantitySelected, setQuantitySelected] = useState(1);

  async function handleAddToBag() {
    const {
      shoppingBag: { bagItems },
    } = state;

    let inStock = 0;
    try {
      bagItems.map((item) => {
        if (item._id === product._id) {
          if (quantitySelected > item.stock - item.quantity) {
            inStock = item.stock - item.quantity;
            throw 'Over';
          }
        }
      });
      dispatch({
        type: 'BAG_ADD_ITEM',
        payload: {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          image: product.images[0],
          sellingPrice: product.sellingPrice,
          stickerPrice: product.stickerPrice,
          quantity: quantitySelected,
          stock: product.stock,
        },
      });

      router.push('/shoppingBag');
    } catch (err) {
      console.log(err);
      setError({
        err: true,
        message: `Insufficient Items: ${inStock} Items can be added`,
      });
    }
    // console.log(
    //   // data.stock,
    //   // product.stock,
    //   // quantitySelected,
    //   // itemInBag.quantity
    //   itemInBag
    // );
  }

  return (
    <div className={style.productContent}>
      {product.name}
      <br />
      <br />
      SKU: {product.sku}
      <br />
      <br />
      Brand: {product.brand}
      <br />
      <br />
      {product.ribbon}
      <br />
      <br />
      Collections:{' '}
      {product.collections.map((collection) => `${collection.name},`)}
      <br />
      <br />
      Sold: {product.sold}
      <br />
      <br />
      Price: {product.stickerPrice}
      <br />
      <br />
      <Select
        name="quantity"
        options={product.stock}
        onChangeFunction={(quantity) => setQuantitySelected(Number(quantity))}
      />
      <br />
      <br />
      Stock: {product.stock}
      <br />
      <br />
      <button onClick={handleAddToBag}>Add to bag</button>
      <ErrorHandler error={error} />
      <br />
      <br />
      description: {product.description}
      <br />
      <br />
    </div>
  );
}
