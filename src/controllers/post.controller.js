import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import { postService, userService } from "../services/index.js";
import formatTimeDifference from "../utils/formatTimeDifference.js";
import { postValidation } from "../validations/index.js";

const getList = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
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

    const posts = await postService.getList(options);

    if (!posts || posts.length === 0) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(posts, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getById(id);

    if (!post) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(post, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const create = async (req, res) => {
  try {
    const { _id: user_id } = req.user;

    const { error } = postValidation.default.validate(
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

    const post = await postService.create({
      user_id,
      ...req.body,
    });
    if (!post) {
      return res.status(400).json(badRequest(400, "Thêm dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(post, "Thêm dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: user_id } = req.user;

    const { error } = postValidation.default.validate(
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

    const post = await postService.update({ id, user_id, ...req.body });

    if (!post) {
      return res.status(400).json(badRequest(400, "Sửa dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(post, "Sửa dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postService.remove(id);

    if (!post) {
      return res.status(400).json(badRequest(400, "Xóa dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(post, "Xóa dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: user_id } = req.user;

    const post = await postService.getById(id);

    if (!post) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    if (!post.likes.includes(user_id)) {
      await post.updateOne({ $push: { likes: user_id } });
      res.status(200).json("You have been like post!");
    } else {
      await post.updateOne({ $pull: { likes: user_id } });
      res.status(200).json("The post has been unliked!!");
    }
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const sharePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: user_id } = req.user;

    const post = await postService.getById(id);

    if (!post) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    await post.updateOne({ $push: { shares: user_id } });

    res.status(200).json("The post has been share!!");
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const postsOnTimeline = async (req, res) => {
  try {
    const { _id: user_id } = req.user;

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

    const user = await userService.getById(user_id);

    user.followings.splice(0, 0, user._id);

    const friendPosts = [];
    for (const friendId of user.followings) {
      const { data } = await postService.getListByOptions({
        field: "user_id",
        payload: friendId,
        options: {
          ...options,
          populate: [
            {
              path: "user_id",
              select:
                "username profile_image full_name followers followings createdAt",
            },
          ],
        },
      });

      friendPosts.push(...data);
    }

    friendPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const newFriendPosts = [];

    friendPosts.map((post) => {
      const createAtDate = new Date(post.createdAt);
      const now = new Date();

      const timeDifference = now.getTime() - createAtDate.getTime();

      newFriendPosts.push({
        ...post._doc,
        createdAt: formatTimeDifference(timeDifference),
      });
    });

    res
      .status(200)
      .json(successfully(newFriendPosts, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getAllPostForOneUser = async (req, res) => {
  try {
    const { _id: user_id } = req.user;

    const { docs: posts } = await postService.getListByOptions({
      field: "user_id",
      payload: user_id,
      options: {
        populate: [{ path: "user_id", select: "username email full_name" }],
      },
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(posts, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getAllMediaPostsUser = async (req, res) => {
  try {
    const { _id: user_id } = req.user;

    const { docs: posts } = await postService.getListByOptions({
      field: "user_id",
      payload: user_id,
      options: {},
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    const newMedia = [];
    posts.map((post) => {
      const data = post?.media.map(({ type, url }) => {
        return { post_id: post._id, type, url };
      });

      newMedia.push(...data);
    });

    res.status(200).json(successfully(newMedia, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

export {
  getList,
  getById,
  create,
  update,
  remove,
  likePost,
  sharePost,
  postsOnTimeline,
  getAllPostForOneUser,
  getAllMediaPostsUser,
};
