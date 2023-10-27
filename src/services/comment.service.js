import Comment from "../models/comment.model.js";

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Comment.findOne(query);
};

const create = (data) => {
  return Comment.create(data);
};

export { getByOptions, create };
