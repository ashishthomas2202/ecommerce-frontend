import mongoose from 'mongoose';
import crypto from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { User as userSettings } from '../utils/settings';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: userSettings.username,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: userSettings.email,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.virtual('fullname').get(function () {
  return this.firstName + ' ' + this.lastName;
});

userSchema.methods = {
  authenticate: function (plainText) {
    let pass = this.encryptPassword(plainText).toString();
    return pass === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return '';

    try {
      return crypto.HmacSHA256(password, this.salt);
    } catch (err) {
      return { err };
    }
  },
};

userSchema.plugin(uniqueValidator);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
