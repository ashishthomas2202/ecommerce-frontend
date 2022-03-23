import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';
import { data } from '../../../utils/seed/productData';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products, (err) => {
    if (err) {
      res.send({ message: 'Product seeded UnSuccessfully', error: err });
    } else {
      res.send({ message: 'Product seeded Successfully' });
    }
  });
  await db.disconnect();
});

export default handler;
