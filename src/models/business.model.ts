import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

// App schema
// const AppSchema = new Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     public_key: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//   },
//   {
//     timestamps: {
//       createdAt: "created_at",
//       updatedAt: "updated_at",
//     },
//   }
// );
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
    // apps: [AppSchema],
    type: { type: String, trim: true, required: false },
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
  // apps: AppDocument[];
  webhook_url?: string;
  type?: string;
  user_id: string;
};

export const Business = mongoose.model("Business", BusinessSchema);
