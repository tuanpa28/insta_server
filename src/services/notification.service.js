import Notification from "../models/notification.model.js";

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Notification.findOne(query);
};

const create = (data) => {
  return Notification.create(data);
};

export { getByOptions, create };
