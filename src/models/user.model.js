import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema(
  {
    googleId: {
      type: String,
    },
    username: {
      type: String,
      min: 4,
      max: 50,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    full_name: {
      type: String,
      min: 4,
      max: 50,
      required: true,
    },
    profile_image: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      max: 500,
      default: "",
    },
    date_of_birth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      default: "",
    },
    current_city: {
      type: String,
      max: 100,
      default: "",
    },
    from: {
      type: String,
      max: 100,
      default: "",
    },
    followers: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ username: "text", full_name: "text" });
userSchema.plugin(mongoosePaginate);

export default mongoose.model("User", userSchema);
