import React, { useContext, useState } from 'react';
import style from './ProductContent.module.scss';
import { Store } from '../../../../utils/store';
import { useRouter } from 'next/router';
import Select from '../../Basic/Select/Select';

export default function ProductContent({ product }) {
  const { dispatch } = useContext(Store);
  const router = useRouter();

  const [quantitySelected, setQuantitySelected] = useState(1);

  async function handleAddToBag() {
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
      <br />
      <br />
      description: {product.description}
      <br />
      <br />
    </div>
  );
}
