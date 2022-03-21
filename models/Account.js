import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const accountSchema = mongoose.Schema(
  {
    addressBook: String,
  },
  { timestamps: true }
);

accountSchema.plugin(uniqueValidator);

const Account =
  mongoose.models.Collection || mongoose.model('Account', accountSchema);

export default Account;
