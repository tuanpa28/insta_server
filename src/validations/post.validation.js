import Joi from "joi";

const postSchema = Joi.object({
  user_id: Joi.string().required(),
  caption: Joi.string().max(500),
  likes: Joi.array(),
});

export default postSchema;
