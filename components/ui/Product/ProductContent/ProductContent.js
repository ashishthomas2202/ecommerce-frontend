import React, { useContext } from 'react';
import style from './ProductContent.module.scss';
import { Store } from '../../../../utils/store';
import axios from 'axios';
// import ProductDetailSection from '../ProductDetailSection/ProductDetailSection';
export default function ProductContent({ product }) {
  const { dispatch } = useContext(Store);

  async function handleAddToBag() {
    // const { data } = await axios.get(`/api/products/${product._id}`);
    // console.log(data);
    // console.log({ product });
    dispatch({
      type: 'BAG_ADD_ITEM',
      payload: {
        _id: product._id,
        quantity: 1,
      },
    });

    // dispatch({ type: 'BAG_ADD_ITEM', payload: { ...product, quantity: 1 } });
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

{
  /* <div className={style.ProductContent}>
      <div className={style.general}>
        <h2>{product.name}</h2>
        <h5>Brand: {product.brand}</h5>
        <h6>SKU: {product.sku}</h6>
        <h3>{product.price}</h3>

        <button>Add to cart</button>

        <button>Buy now</button>

        <button>Favorite</button>
      </div>
      <ProductDetailSection title="Description" content={product.description} />
      <ProductDetailSection
        title="Shipping"
        content={product.description}
      />{' '}
      <ProductDetailSection title="Returns" content={product.description} />
    </div> */
}

// <div className={style.productDetails}>
//   <div className={style.images}>
//     <div className={style.mainImageWrapper}>
//       <div
//         className={style.mainImage}
//         style={{ backgroundImage: `url(${product.images[0]})` }}
//       ></div>
//     </div>

//     {
//       <div className={style.additionalImagesWrapper}>
//         {product.images.map((image, i) => {
//           if (i != 0)
//             return (
//               <div
//                 className={style.additionalImage}
//                 style={{ backgroundImage: `url(${image})` }}
//               ></div>
//             );
//         })}
//       </div>
//     }
//   </div>
//   <div className={style.details}>
//     <div className={style.general}>
//       <h2>{product.name}</h2>
//       <h5>Brand: {product.brand}</h5>
//       <h6>SKU: {product.sku}</h6>
//       <h3>{product.price}</h3>

//       <button>Add to cart</button>

//       <button>Buy now</button>

//       <button>Favorite</button>
//     </div>

//     <ProductDetailSection
//       title="Description"
//       content={product.description}
//     />
//     <ProductDetailSection title="Shipping" content={product.description} />
//     <ProductDetailSection title="Returns" content={product.description} />
//   </div>
// </div>
