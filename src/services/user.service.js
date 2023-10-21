import User from "../models/user.model.js";

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return User.findOne(query);
};

export { getByOptions };
