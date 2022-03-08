import React from 'react';
import Link from 'next/link';
import style from './Product.module.scss';

export default function Product({ data }) {
  return (
    <Link href={`product/${data.id}`} passHref>
      <div className={style.product}>
        <div
          className={style.image}
          style={{ backgroundImage: `url(${data.images[0]})` }}
        ></div>
        <ul className={style.info}>
          <li className={style.name}>{data.name}</li>
          <li className={style.price}>${data.price}</li>
          <li>
            <button className={style.addToCart}>Add to cart</button>
          </li>
        </ul>
      </div>
    </Link>
  );
}
