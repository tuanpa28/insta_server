import Share from "../models/share.model.js";

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Share.findOne(query);
};

const create = (data) => {
  return Share.create(data);
};

export { getByOptions, create };
