import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import { postService } from "../services/index.js";
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
    // const { _id: user_id } = req.user;
    const user_id = "653b7a7b7bc959830d613d81";

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
    // const { _id: user_id } = req.user;
    const user_id = "653b7a7b7bc959830d613d81";

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
    // const { _id: user_id } = req.user;
    const user_id = "653f096f01e8ec2f49215c74";

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
    // const { _id: user_id } = req.user;
    const user_id = "653f096f01e8ec2f49215c74";

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

export { getList, getById, create, update, remove, likePost, sharePost };
