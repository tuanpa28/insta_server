import Joi from "joi";

const notificationSchema = Joi.object({
  user_id: Joi.string().required(),
  type: Joi.string().required(),
  source_id: Joi.string().required(),
  seen: Joi.boolean(),
});

export default notificationSchema;
