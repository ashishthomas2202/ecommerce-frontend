import React from 'react';
import Link from 'next/link';
import style from './Product.module.scss';

export default function Product({ data }) {
  return (
    <Link href={`/product/${data.slug}`} passHref>
      <div className={style.product}>
        <div
          className={style.image}
          style={{ backgroundImage: `url(${data.images[0].path})` }}
        ></div>
        <ul className={style.info}>
          <li className={style.name}>{data.name}</li>
          <li className={style.price}>${data.stickerPrice}</li>
          <li>
            <button className={style.addToBag}>Add to bag</button>
          </li>
        </ul>
      </div>
    </Link>
  );
}
