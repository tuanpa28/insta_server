import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  full_name: Joi.string(),
  profile_image: Joi.string(),
  bio: Joi.string(),
  date_of_birth: Joi.string(),
  gender: Joi.string(),
  current_city: Joi.string(),
  from: Joi.string(),
  followers: Joi.array(),
  followings: Joi.array(),
  isAdmin: Joi.boolean(),
});

export default userSchema;
