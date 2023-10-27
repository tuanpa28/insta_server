import mongoose, { Schema } from "mongoose";

const shareSchema = new Schema(
  {
    user_id: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    post_id: {
      type: mongoose.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Share", shareSchema);
