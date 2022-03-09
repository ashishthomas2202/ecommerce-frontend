import React from 'react';
import { useRouter } from 'next/router';
// import { data } from '../../utils/data';
import ProductDetailView from '../../components/ui/Product/ProductDetailView/ProductDetailView';
import db from '../../utils/db';
import Product from '../../models/Product';

export default function ProductDetails({ products }) {
  const router = useRouter();
  const { slug } = router.query;
  const product = products.find((product) => {
    console.log(product.slug, '\n', slug, '\n\n');
    return product.slug === slug;
  });
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div>
      <ProductDetailView product={product} />
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
