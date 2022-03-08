import nc from 'next-connect';
import Collection from '../../../models/Collection';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const collections = await Collection.find({});
  await db.disconnect();
  res.send(collections);
});

export default handler;
