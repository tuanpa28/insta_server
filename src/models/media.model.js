import mongoose, { Schema } from "mongoose";

const mediaSchema = new Schema(
  {
    post_id: {
      type: mongoose.ObjectId,
      ref: "Post",
      required: true,
    },
    media_type: {
      type: String,
      required: true,
      enum: ["image", "video"],
    },
    media_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Media", mediaSchema);
