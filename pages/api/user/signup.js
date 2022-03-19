import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import Account from '../../../models/Account';

const handler = nc();

handler.post(async (req, res) => {
  let data = req.body;

  let fields = {
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  };

  if (data.username) {
    fields['username'] = data.username;
  }
  if (data.email) {
    fields['email'] = data.email;
  }

  await db.connect();

  //Creating new account
  const newAccount = new Account();
  const account = await newAccount.save();

  //Creating new user
  const newUser = new User({ ...fields, account });
  const user = await newUser.save();

  await db.disconnect();

  res.send({ message: 'Signed Up Successfully' });
});

export default handler;
