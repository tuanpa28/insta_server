import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import { userService } from "../services/index.js";
import { userValidation } from "../validations/index.js";

const getList = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      _sort = "createdAt",
      _order = "asc",
      ...params
    } = req.query;

    const options = {
      page,
      limit,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
      ...params,
      customLabels: {
        docs: "data",
      },
    };

    const users = await userService.getList(options);

    if (!users || users.length === 0) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(users, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(user, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    // const { error } = userValidation.default.validate(req.body, {
    //   abortEarly: false,
    // });

    // if (error) {
    //   const errors = error.details.map((err) => err.message);
    //   return res.status(400).json(badRequest(400, errors));
    // }

    const user = await userService.update({ id, ...req.body });

    if (!user) {
      return res.status(400).json(badRequest(400, "Sửa dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(user, "Sửa dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.remove(id);

    if (!user) {
      return res.status(400).json(badRequest(400, "Xóa dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(user, "Xóa dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const followUser = async (req, res) => {
  try {
    // const { _id: user_id } = req.user;
    const user_id = "653b7a7b7bc959830d613d81";

    if (user_id !== req.params.id) {
      const user = await userService.getById(req.params.id);
      const currentUser = await userService.getById(user_id);

      if (!user.followers.includes(user_id)) {
        await user.updateOne({ $push: { followers: user_id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed!!");
      } else {
        await user.updateOne({ $pull: { followers: user_id } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed!!");
      }
    } else {
      return res.status(403).json(badRequest(403, "You cant follow youself!!"));
    }
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getUserSuggested = async (req, res) => {
  try {
    // const { _id: user_id } = req.user;
    const user_id = "6537e3c967f4a1938f59a5a1";

    const { page = 1, limit = 8, ...params } = req.query;

    const options = {
      page,
      limit,
      ...params,
      customLabels: {
        docs: "data",
      },
    };

    const user = await userService.getById(user_id);

    if (!user) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    const userFollowings = user.followings;

    const suggestedUsers = await userService.getListByOptions({
      field: "followers",
      payload: { $in: userFollowings },
      options,
    });

    res
      .status(200)
      .json(successfully(suggestedUsers, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

export { getList, getById, update, remove, followUser, getUserSuggested };
