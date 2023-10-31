import Post from "../models/post.model.js";

const getList = (options) => {
  return Post.paginate(
    {},
    {
      ...options,
      populate: [{ path: "user_id", select: "username email full_name" }],
    }
  );
};

const getListByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Post.paginate(query, options.options);
};

const getById = (id) => {
  return Post.findById(id).populate({
    path: "user_id",
    select: "username email full_name",
  });
};

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Post.findOne(query);
};

const countDocuments = () => {
  return Post.countDocuments();
};

const create = (post) => {
  return Post.create(post);
};

const update = (post) => {
  const { id, ...data } = post;
  return Post.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Post.findByIdAndDelete(id);
};

export {
  getList,
  getListByOptions,
  getById,
  getByOptions,
  countDocuments,
  create,
  update,
  remove,
};
