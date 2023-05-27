import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Business Schema
 */
const BusinessSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
    encrypted_pk: { type: String, trim: true },
    api_key: { type: String, trim: true },
    webhook_url: { type: String, trim: true, required: false },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
// export type AppDocument = mongoose.Document & {
//   name: string;
// };
export type BusinessDocument = mongoose.Document & {
  name: string;
  webhook_url: string;
  api_key: string;
  type: string;
  encrypted_pk?: string;
};

export const Business = mongoose.model("Business", BusinessSchema);
