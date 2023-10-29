import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
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
    content: {
      type: String,
      max: 400,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    replies: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Comment", commentSchema);
