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
      enum: ["like", "comment", "follow", "share"],
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
