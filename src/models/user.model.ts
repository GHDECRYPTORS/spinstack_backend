import * as mongoose from "mongoose";
const bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

import * as jwt from "jsonwebtoken";
/**
 * User Schema
 */
const UserSchema = new Schema(
  {
    full_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    hash_password: {
      type: String,
    },
    business_id: {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.hash_password);
};

UserSchema.methods.showDetails = function () {
  return {
    _id: this._id,
    full_name: this.full_name,
    email: this.email,
    business_id: this.business_id ?? null
  };
};

UserSchema.methods.login = function (message: string) {
  return {
    message,
    token: jwt.sign(
      { email: this.email, full_name: this.full_name, _id: this._id },
      process.env.JWT_SECRET as string
    ),
    user: this.showDetails(),
  };
};
export interface UserI {
  full_name: string;
  email: string;
  hash_password?: string;
  business_id: string;
  comparePassword: (password: string) => boolean;
  showDetails: () => object;
  login(message: string): object;
}
export type UserDocument = mongoose.Document & UserI;

export const User = mongoose.model("User", UserSchema);
