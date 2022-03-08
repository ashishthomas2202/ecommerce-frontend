import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

collectionSchema.plugin(uniqueValidator);

const Collection =
  mongoose.models.Collection || mongoose.model('Collection', collectionSchema);

export default Collection;
