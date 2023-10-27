import User from "../models/user.model.js";

const getList = (options) => {
  return User.paginate({}, options);
};

const getById = (id) => {
  return User.findById(id);
};

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return User.findOne(query);
};

const countDocuments = () => {
  return User.countDocuments();
};

const create = (user) => {
  return User.create(user);
};

const update = (user) => {
  const { id, ...data } = user;
  return User.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return User.findByIdAndDelete(id);
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
