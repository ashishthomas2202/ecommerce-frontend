import React, { useContext } from 'react';
import style from './ProductContent.module.scss';
import { Store } from '../../../../utils/store';
import { useRouter } from 'next/router';
// import axios from 'axios';
// import ProductDetailSection from '../ProductDetailSection/ProductDetailSection';
export default function ProductContent({ product }) {
  const { dispatch } = useContext(Store);
  const router = useRouter();

  async function handleAddToBag() {
    dispatch({
      type: 'BAG_ADD_ITEM',
      payload: {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        stickerPrice: product.stickerPrice,
        quantity: 1,
      },
    });

    router.push('/shoppingBag');
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
      Quantity: {product.quantity}
      <br />
      <br />
      <button onClick={handleAddToBag}>Add to bag</button>
      <br />
      <br />
      description: {product.description}
      <br />
      <br />
    </div>
  );
}
