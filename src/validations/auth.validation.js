import Joi from "joi";

const authSchema = Joi.object({
  username: Joi.string().min(4).messages({
    "string.min": "username phải có ít nhất {#limit} ký tự!",
    "string.empty": "username không được để trống!",
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
  full_name: Joi.string().min(4).messages({
    "string.min": "full_name phải có ít nhất {#limit} ký tự!",
    "string.empty": "full_name không được để trống!",
  }),
});

export default authSchema;
