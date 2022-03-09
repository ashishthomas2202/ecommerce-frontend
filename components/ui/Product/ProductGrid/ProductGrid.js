import React from 'react';
import style from './ProductGrid.module.scss';
import Product from '../Product/Product';
import { data as dat } from '../../../../utils/data';

export default function ProductGrid({ title, data }) {
  // console.log(data);
  const products = data.products;

  const productGrid = (
    <div className={style.productGrid}>
      {' '}
      {products.map((product, i) => {
        return <Product key={'grid-' + product.sku + (i + 1)} data={product} />;
      })}
    </div>
  );
  return (
    <div className={style.gridWrapper}>
      <div className={style.title}>Shop</div>
      {productGrid}
    </div>
  );
}
