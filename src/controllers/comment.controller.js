import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import { commentService } from "../services/index.js";
import { commentValidation } from "../validations/index.js";

const getList = async (req, res) => {
  try {
    const comments = await commentService.getList();

    if (!comments || comments.length === 0) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(comments, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentService.getById(id);

    if (!comment) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(comment, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const create = async (req, res) => {
  try {
    const { _id: user_id } = req.user;

    const { error } = commentValidation.default.validate(
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

    const comment = await commentService.create({
      user_id,
      ...req.body,
    });
    if (!comment) {
      return res.status(400).json(badRequest(400, "Thêm dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(comment, "Thêm dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: user_id } = req.user;

    const { error } = commentValidation.default.validate(
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

    const comment = await commentService.update({ id, user_id, ...req.body });

    if (!comment) {
      return res.status(400).json(badRequest(400, "Sửa dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(comment, "Sửa dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await commentService.remove(id);

    if (!comment) {
      return res.status(400).json(badRequest(400, "Xóa dữ liệu thất bại!"));
    }

    res.status(200).json(successfully(comment, "Xóa dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getAllCommentForOnePost = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await commentService.getListByOptions({
      field: "post_id",
      payload: id,
    });

    if (!comments || comments.length === 0) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    res.status(200).json(successfully(comments, "Lấy dữ liệu thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: user_id } = req.user;

    const comment = await commentService.getById(id);

    if (!comment) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    if (!comment.likes.includes(user_id)) {
      await comment.updateOne({ $push: { likes: user_id } });
      res.status(200).json("You have been like comment!");
    } else {
      await comment.updateOne({ $pull: { likes: user_id } });
      res.status(200).json("The comment has been unliked!!");
    }
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const createCommentReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply_id, content } = req.body;
    const { _id: user_id } = req.user;

    const reply = {
      _id: reply_id,
      user_id,
      content,
    };

    const comment = await commentService.getById(id);

    if (!comment) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    await comment.updateOne({ $push: { replies: reply } });

    res.status(200).json("Replied to the comment!!!");
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const deleteCommentReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply_id, idAdminPost } = req.body;
    const { _id: user_id } = req.user;

    const comment = await commentService.getById(id);
    if (!comment) {
      return res.status(404).json(badRequest(404, "Không có dữ liệu!"));
    }

    if (
      user_id === idAdminPost ||
      comment.replies.some((item) => item.user_id === user_id)
    ) {
      await comment.updateOne({
        $pull: { replies: { _id: reply_id } },
      });
      res.status(200).json("The reply has been deleted!!");
    } else {
      res
        .status(400)
        .json(badRequest(400, "You can delete only your reply!!!"));
    }
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getAllReplyForOneComment = async (req, res) => {
  try {
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
  getAllCommentForOnePost,
  likeComment,
  createCommentReply,
  deleteCommentReply,
  getAllReplyForOneComment,
};
