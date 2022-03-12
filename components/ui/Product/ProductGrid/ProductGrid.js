import React from 'react';
import style from './ProductGrid.module.scss';
import Product from '../Product/Product';

export default function ProductGrid({ title, data }) {
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
