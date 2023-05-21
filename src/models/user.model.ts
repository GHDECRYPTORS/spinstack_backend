import * as mongoose from "mongoose";
const bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

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

export type UserDocument = mongoose.Document & {
  full_name: string;
  email: string;
  hash_password?: string;
  business_id: string;
  comparePassword: (password: string) => boolean;
};

export const User = mongoose.model("User", UserSchema);
