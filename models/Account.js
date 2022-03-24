import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Address from './Address';

const accountSchema = mongoose.Schema(
  {
    addressBook: {
      book: [
        {
          type: mongoose.ObjectId,
          ref: 'Address',
        },
      ],
      defaultShippingAddress: {
        type: mongoose.ObjectId,
        ref: 'Address',
        default: null,
      },
      defaultBillingAddress: {
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
