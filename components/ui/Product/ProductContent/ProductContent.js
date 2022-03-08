import React from 'react';
import style from './ProductContent.module.scss';

import ProductDetailSection from '../ProductDetailSection/ProductDetailSection';
export default function ProductContent({ product }) {
  return <div className={style.productContent}>Des</div>;
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
