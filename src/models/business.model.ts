import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

// App schema
const AppSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
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
    apps: [AppSchema],
    webhook_url: { type: String, trim: true, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
export type AppDocument = mongoose.Document & {
  name: string;
};
export type BusinessDocument = mongoose.Document & {
  name: string;
  apps: AppDocument[];
  webhook_url: string;
};

export const Business = mongoose.model("Business", BusinessSchema);
