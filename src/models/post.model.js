import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    user_id: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      max: 500,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Post", postSchema);
