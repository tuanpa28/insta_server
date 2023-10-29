import Joi from "joi";

const commentSchema = Joi.object({
  user_id: Joi.string().required(),
  post_id: Joi.string().required(),
  content: Joi.string().required().max(400),
  likes: Joi.array(),
  replies: Joi.array(),
});

export default commentSchema;
