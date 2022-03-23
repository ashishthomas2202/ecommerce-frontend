import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Address from './Address';

const accountSchema = mongoose.Schema(
  {
    AddressBook: [
      // {
      //   type: mongoose.ObjectId,
      //   ref: 'Address',
      // },
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Account =
  mongoose.models.Account || mongoose.model('Account', accountSchema);

export default Account;
