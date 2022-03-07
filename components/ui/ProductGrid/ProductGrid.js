import React from 'react';
import style from './ProductGrid.module.scss';
import Product from '../Product/Product';
import { data } from '../../../utils/data';

export default function ProductGrid() {
  const products = data.products;

  const productGrid = products.map((product, i) => {
    return <Product key={'grid-' + product.sku + (i + 1)} data={product} />;
  });
  return <div className={style.productGrid}>{productGrid}</div>;
}
