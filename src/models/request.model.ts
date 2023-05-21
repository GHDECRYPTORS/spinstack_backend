import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Request Schema
 */
const RequestSchema = new Schema(
  {
    request_id: {
      type: String,
      trim: true,
      required: true,
    },
    business_id: {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
    status: {
      type: String,
      trim: true,
      required: true,
      default: "pending",
    },
    processed: {
      type: Boolean,
      trim: true,
      default: false,
    },
    request: {
      type: Object,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export type RequestDocument = mongoose.Document & {
  request_id: string;
  business_id: string;
};

export const RequestModel = mongoose.model("Request", RequestSchema);
