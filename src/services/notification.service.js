import Notification from "../models/notification.model.js";

const getList = () => {
  return Notification.find();
};

const getById = (id) => {
  return Notification.findById(id);
};

const getByOptions = (options) => {
  const query = {
    [options.field]: options.payload,
  };
  return Notification.findOne(query);
};

const countDocuments = () => {
  return Notification.countDocuments();
};

const create = (notification) => {
  return Notification.create(notification);
};

const update = (notification) => {
  const { id, ...data } = notification;
  return Notification.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Notification.findByIdAndDelete(id);
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
