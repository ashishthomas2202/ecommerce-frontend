import React from 'react';
import style from './ProductDetailView.module.scss';
import ProductDetailSection from '../ProductDetailSection/ProductDetailSection';
import ProductCarousel from '../ProductCarousel/ProductCarousel';
import ProductContent from '../ProductContent/ProductContent';

export default function ProductDetailView({ product }) {
  return (
    <div className={style.productDetailView}>
      <ProductCarousel product={product} />
      <ProductContent product={product} />
    </div>
  );
}
