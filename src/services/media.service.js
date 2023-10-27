import Media from "../models/media.model.js";

const getList = () => {
  return Media.find();
};

const getById = (id) => {
  return Media.findById(id);
};

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Media.findOne(query);
};

const countDocuments = () => {
  return Media.countDocuments();
};

const create = (media) => {
  return Media.create(media);
};

const update = (media) => {
  const { id, ...data } = media;
  return Media.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Media.findByIdAndDelete(id);
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
