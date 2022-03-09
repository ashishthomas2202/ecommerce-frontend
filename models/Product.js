import mongoose from 'mongoose';
import Collection from './Collection';
import uniqueValidator from 'mongoose-unique-validator';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import _ from 'lodash';
import { Brand } from '../utils/settings';

// let objectId = mongoose.Types.ObjectId();

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
      default: Brand.name,
    },
    ribbon: {
      type: String,
      trim: true,
    },
    collections: [
      {
        type: mongoose.ObjectId,
        ref: 'Collection',
        required: true,
      },
    ],
    images: [
      {
        name: {
          type: String,
          trim: true,
        },
        extension: {
          type: String,
          trim: true,
          maxlength: 10,
        },
        path: {
          type: String,
          trim: true,
        },
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    onePrice: {
      type: Boolean,
      required: true,
      default: true,
    },
    costPrice: {
      type: Number,
      trim: true,
      min: 0.01,
      max: 99999,
    },
    stickerPrice: {
      type: Number,
      trim: true,
      min: 0.01,
      max: 99999,
    },
    margin: {
      type: Number,
      trim: true,
      min: 0.01,
      max: 99999,
    },
    quantity: {
      type: Number,
      trim: true,
      min: 0,
    },
    onSale: {
      type: Boolean,
      required: true,
      default: false,
    },
    discount: {
      amount: {
        type: Number,
        trim: true,
        min: 0.01,
        max: 99999,
      },
      symbol: {
        type: String,
        trim: true,
        maxlength: 1,
      },
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    additionalInfo: [
      {
        title: {
          type: String,
          trim: true,
        },
        info: {
          type: String,
          trim: true,
        },
      },
    ],
    productOptions: [
      {
        optionTitle: {
          type: String,
          trim: true,
        },
        varients: [
          {
            name: {
              type: String,
              trim: true,
            },
            stock: [
              {
                costPrice: {
                  type: Number,
                  trim: true,
                  min: 0.01,
                  max: 99999,
                },
                stickerPrice: {
                  type: Number,
                  trim: true,
                  min: 0.01,
                  max: 99999,
                },
                margin: {
                  type: Number,
                  trim: true,
                  min: 0.01,
                  max: 99999,
                },
                quantity: {
                  type: Number,
                  trim: true,
                  min: 0,
                  max: 999999,
                },
                weight: {
                  value: {
                    type: Number,
                    trim: true,
                    min: 0,
                  },
                  unit: {
                    type: String,
                    trim: true,
                    maxlength: 10,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

productSchema.virtual('slug').get(function () {
  return `${_.kebabCase(this.name)}-${this._id}`;
});

productSchema.plugin(uniqueValidator);
productSchema.plugin(mongooseLeanVirtuals);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
