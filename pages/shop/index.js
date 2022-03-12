import React from 'react';
import ProductGrid from '../../components/ui/Product/ProductGrid/ProductGrid';
import Product from '../../models/Product';
import db from '../../utils/db';

export default function Shop({ products }) {
  return (
    <div>
      <ProductGrid title="Shop" data={{ products }} />
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({})
    .populate('collections')
    .lean({ virtuals: true });
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
