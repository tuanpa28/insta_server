import Share from "../models/share.model.js";

const getList = () => {
  return Share.find();
};

const getById = (id) => {
  return Share.findById(id);
};

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Share.findOne(query);
};

const countDocuments = () => {
  return Share.countDocuments();
};

const create = (share) => {
  return Share.create(share);
};

const update = (share) => {
  const { id, ...data } = share;
  return Share.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Share.findByIdAndDelete(id);
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
