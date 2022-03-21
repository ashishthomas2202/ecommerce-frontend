import db from '../../../utils/db';
import User from '../../../models/User';
import Account from '../../../models/Account';
async function handler(req, res) {
  let data = req.body;

  let fields = {
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    accountId: new Account(),
  };

  if (data.username) {
    fields['username'] = data.username;
  }
  if (data.email) {
    fields['email'] = data.email;
  }

  await db.connect();
  const newUser = new User(fields);
  await db.disconnect();
}

export default handler;
