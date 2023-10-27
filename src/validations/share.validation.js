import Joi from "joi";

const shareSchema = Joi.object({
  user_id: Joi.string().required(),
  post_id: Joi.string().required(),
});

export default shareSchema;
