import React from 'react';
import style from './Product.module.scss';

export default function Product({ data }) {
  console.log(data);

  return (
    <div className={style.product}>
      <div
        className={style.image}
        style={{ backgroundImage: `url(${data.image[0]})` }}
      ></div>
      <div className={style.name}>{data.name}</div>
      <div className={style.price}>{data.price}</div>
      <div className={style.addToCart}>Add To Cart</div>
    </div>
  );
}
