import Media from "../models/media.model.js";

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Media.findOne(query);
};

const create = (data) => {
  return Media.create(data);
};

export { getByOptions, create };
