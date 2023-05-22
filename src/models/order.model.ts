import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Order Schema
 */
const OrderSchema = new Schema(
  {
    request_id: {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
    business_id: {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
    status: {
      type: String,
      trim: true,
      required: true,
      default: 'pending'
    },
    processed: {
      type: Boolean,
      trim: true,
      default: false,
    },
    amount: {
      type: Number,
      trim: true,
      required: true,
    },
    currency: {
      type: String,
      trim: true,
      required: true,
    },
    meta: {
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

export type OrderDocument = mongoose.Document & {
  request_id: string;
  business_id: string;
  status: string;
  processed: string;

};

export const Order = mongoose.model("Order", OrderSchema);