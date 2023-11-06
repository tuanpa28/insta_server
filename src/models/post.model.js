import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slugify from "slugify";
import randomstring from "randomstring";

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
      required: true,
    },
    media: [
      {
        type: {
          type: String,
          enum: ["image", "video"],
          required: true,
        },
        url: String,
      },
    ],
    likes: {
      type: Array,
      default: [],
    },
    shares: {
      type: Array,
      default: [],
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

postSchema.plugin(mongoosePaginate);

postSchema.pre("save", async function (next) {
  try {
    this.slug = slugify(this.caption, { replacement: "_", lower: true });

    const model = mongoose.model("Post");
    const slug = this.slug;
    // Kiểm tra nếu slug đã tồn tại hoặc là rỗng, thêm chuỗi ngẫu nhiên vào slug
    const existingPost = await model.findOne({ slug });
    if (existingPost) {
      const randomString = randomstring.generate(8);
      this.slug = `${slug}_${randomString}`;
    }
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Post", postSchema);
