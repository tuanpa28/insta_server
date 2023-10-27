import Joi from "joi";

const mediaSchema = Joi.object({
  post_id: Joi.string().required(),
  media_type: Joi.string().valid("image", "video").required(),
  media_url: Joi.string().required(),
});

export default mediaSchema;
