import React from 'react';
import ProductDetailView from '../../components/ui/Product/ProductDetailView/ProductDetailView';
import db from '../../utils/db';
import Product from '../../models/Product';

export default function ProductDetails({ product }) {
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div>
      <ProductDetailView product={product} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug })
    .populate('collections')
    .lean({ virtuals: true });
  await db.disconnect();

  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
