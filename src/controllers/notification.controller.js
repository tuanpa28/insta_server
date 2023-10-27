import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import { notificationService } from "../services/index.js";
import { notificationValidation } from "../validations/index.js";

const getList = async (req, res) => {
  try {
    const notifications = await notificationService.getList();

    if (!notifications || notifications.length === 0) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res
      .status(200)
      .json(successfully(notifications, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationService.getById(id);

    if (!notification) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(notification, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const create = async (req, res) => {
  try {
    // const { _id: user_id } = req.user;
    const user_id = "653b7a7b7bc959830d613d81";

    const { error } = notificationValidation.default.validate(
      {
        user_id,
        ...req.body,
      },
      {
        abortEarly: false,
      }
    );

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json(badRequest(400, errors));
    }

    const notification = await notificationService.create({
      user_id,
      ...req.body,
    });
    if (!notification) {
      return res.status(400).json(badRequest(400, "Thêm dữ liệu thất bại!"));
    }

    res
      .status(200)
      .json(successfully(notification, "Thêm dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    // const { _id: user_id } = req.user;
    const user_id = "653b7a7b7bc959830d613d81";

    const { error } = notificationValidation.default.validate(
      {
        user_id,
        ...req.body,
      },
      {
        abortEarly: false,
      }
    );

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json(badRequest(400, errors));
    }

    const notification = await notificationService.update({
      id,
      user_id,
      ...req.body,
    });

    if (!notification) {
      return res.status(400).json(badRequest(400, "Sửa dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(notification, "Sửa dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await notificationService.remove(id);

    if (!notification) {
      return res.status(400).json(badRequest(400, "Xóa dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(notification, "Xóa dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

export { getList, getById, create, update, remove };
