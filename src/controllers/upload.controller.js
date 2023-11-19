import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files?.length <= 0)
      return res.status(400).json(badRequest(400, "Upload thất bại!"));

    const results = req.files?.map((result) => ({
      type: result.fieldname,
      url: result.path,
    }));

    res.status(200).json(successfully(results, "Upload thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const uploadVideo = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json(badRequest(400, "Upload thất bại!"));

    const result = {
      type: req.file.fieldname,
      url: req.file.path,
    };
    res.status(200).json(successfully(result, "Upload thành công!"));
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

export { uploadImages, uploadVideo };
