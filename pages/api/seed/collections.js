import nc from 'next-connect';
import Collection from '../../../models/Collection';
import db from '../../../utils/db';
import { data } from '../../../utils/seedCollectionData';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Collection.deleteMany();
  await Collection.insertMany(data.collections, (err) => {
    if (err) {
      res.send({ message: 'Collections seeded Unuccessfully', error: err });
    } else {
      res.send({ message: 'Collections seeded Successfully' });
    }
  });
  await db.disconnect();
});

export default handler;
