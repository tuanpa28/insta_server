import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import User from "../models/user.model.js";
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
    const user_id = "653f1999f09df8dbcd8e0cc6";

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

const searchUser = async (req, res) => {
  try {
    const { q } = req.query;

    // const users = await userService.getListByOptions({
    //   field: "$text",
    //   payload: {
    //     $search: q,
    //     $caseSensitive: false,
    //     $diacriticSensitive: false,
    //   },
    //   options: {},
    // });

    const users = await User.find({
      $text: {
        $search: q,
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    });

    // if (!users || users.length === 0) {
    //   return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    // }

    // const data = users.map((user) => ({
    //   id: user._id,
    //   profile_image: user.profile_image,
    //   username: user.username,
    //   email: user.email,
    //   full_name: user.full_name,
    // }));

    res.status(200).json(successfully(users, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getFollowers = async (req, res) => {
  try {
    // const { _id: user_id } = req.user;
    const user_id = "653f096f01e8ec2f49215c74";

    const user = await User.findById(user_id).populate({
      path: "followers",
      select: "username email full_name profile_image bio current_city",
    });

    if (!user) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(user, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getFollowings = async (req, res) => {
  try {
    // const { _id: user_id } = req.user;
    const user_id = "653f096f01e8ec2f49215c74";

    const user = await User.findById(user_id).populate({
      path: "followings",
      select: "username email full_name profile_image bio current_city",
    });

    if (!user) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(user, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

export {
  getList,
  getById,
  update,
  remove,
  followUser,
  getUserSuggested,
  searchUser,
  getFollowers,
  getFollowings,
};
