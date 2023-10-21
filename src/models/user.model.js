import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      min: 3,
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
      min: 3,
      max: 50,
    },
    bio: {
      type: String,
      max: 500,
      default: "",
    },
    date_of_birth: {
      type: Date,
      default: "",
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
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
