import mongoose from 'mongoose';
import { Address as AddressSettings } from '../utils/settings';

const addressSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    street1: {
      type: String,
      trim: true,
      required: true,
    },
    street2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      required: true,
    },
    zip: {
      type: String,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      default: AddressSettings.country.default,
      required: true,
    },
  },
  { timestamps: true }
);


const Address =
  mongoose.models.Address || mongoose.model('Address', addressSchema);

export default Address;
