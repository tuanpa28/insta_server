import Comment from "../models/comment.model.js";

const getList = () => {
  return Comment.find().populate({
    path: "user_id",
    select: "username email full_name",
  });
};

const getById = (id) => {
  return Comment.findById(id);
};

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Comment.findOne(query);
};

const countDocuments = () => {
  return Comment.countDocuments();
};

const create = (comment) => {
  return Comment.create(comment);
};

const update = (comment) => {
  const { id, ...data } = comment;
  return Comment.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Comment.findByIdAndDelete(id);
};

export {
  getList,
  getById,
  getByOptions,
  countDocuments,
  create,
  update,
  remove,
};
