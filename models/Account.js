import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Address from './Address';

const accountSchema = mongoose.Schema(
  {
    AddressBook: {
      book: [
        {
          type: mongoose.ObjectId,
          ref: 'Address',
        },
      ],
      DefaultShippingAddress: {
        type: mongoose.ObjectId,
        ref: 'Address',
        default: null,
      },
      DefaultBillingAddress: {
        type: mongoose.ObjectId,
        ref: 'Address',
        default: null,
      },
    },
  },
  { timestamps: true }
);

const Account =
  mongoose.models.Account || mongoose.model('Account', accountSchema);

export default Account;
