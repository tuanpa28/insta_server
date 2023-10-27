import badRequest from "../formatResponse/badRequest.js";
import serverError from "../formatResponse/serverError.js";
import successfully from "../formatResponse/successfully.js";
import { mediaService } from "../services/index.js";
import { mediaValidation } from "../validations/index.js";

const getList = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const getById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const create = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const update = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

const remove = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(serverError(error.message));
  }
};

export { getList, getById, create, update, remove };
