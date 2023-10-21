import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import generateToken from "../utils/generateToken.js";
import { userService } from "../services/index.js";
import { userValidation } from "../validations/index.js";

const login = async (req, res) => {
  try {
    const { error } = userValidation.default.validate(req.body);
    if (error) {
      return res.status(400).json(badRequest(400, error.details[0].message));
    }

    const { email, password } = req.body;

    // check if email exists
    const user = await userService.getByOptions({
      field: "email",
      payload: email,
    });
    if (!user) {
      return res
        .status(400)
        .json(badRequest(400, "Email không tồn tại trong hệ thống!!!"));
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(badRequest(400, "Mật khẩu không hợp lệ!!!"));
    }

    const accessToken = await generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    res.status(200).json(successfully({ accessToken }));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

export { login };
