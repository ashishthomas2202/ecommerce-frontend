import React from 'react';
import style from './ProductDetail.module.scss';
import { useRouter } from 'next/router';
import { data } from '../../utils/data';
import ProductDetailSection from '../../components/ui/Product/ProductDetailSection/ProductDetailSection';
import ProductDetailView from '../../components/ui/Product/ProductDetailView/ProductDetailView';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const product = data.products.find((product) => product.id === id);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div>
      <ProductDetailView product={product} />
    </div>
  );
}
