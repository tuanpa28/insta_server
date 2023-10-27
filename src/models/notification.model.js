import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    user_id: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    source_id: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Notification", notificationSchema);
