import Post from "../models/post.model.js";

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Post.findOne(query);
};

const create = (data) => {
  return Post.create(data);
};

export { getByOptions, create };
