import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().required().min(3).messages({
    "string.min": "username phải có ít nhất {#limit} ký tự!",
    "string.empty": "username không được để trống!",
    "any.required": "Trường username là bắt buộc!",
  }),
  email: Joi.string().required().email().messages({
    "string.empty": "email không được để trống!",
    "string.email": "email không đúng định dạng!",
    "any.required": "Trường email là bắt buộc!",
  }),
  password: Joi.string().required().min(6).messages({
    "string.min": "password phải có ít nhất {#limit} ký tự!",
    "string.empty": "password không được để trống!",
    "any.required": "Trường password là bắt buộc!",
  }),
  full_name: Joi.string().required().min(4).messages({
    "string.min": "full_name phải có ít nhất {#limit} ký tự!",
    "string.empty": "full_name không được để trống!",
    "any.required": "Trường full_name là bắt buộc!",
  }),
  profile_image: Joi.string(),
  bio: Joi.string(),
  date_of_birth: Joi.date(),
  gender: Joi.string(),
  current_city: Joi.string(),
  from: Joi.string(),
  followers: Joi.array(),
  followings: Joi.array(),
  isAdmin: Joi.boolean(),
});

export default userSchema;
