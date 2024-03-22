const Bundle = require("../models/bundleModel");
const StatusCode = require("../helper/status_code_helper");

const bundleCreate = async (req, res) => {
  try {
    const { name, type, prod_patch_id, orientation, index_fileName } = req.body;

    if (
      name === "" ||
      type === "" ||
      prod_patch_id === "" ||
      orientation === "" ||
      index_fileName === ""
    ) {
      return new StatusCode.RESOURCE_EXHAUSTED(
        "Please provide all required fields"
      );
    }
    const result = await Bundle.bundleCreate(
      name,
      type,
      prod_patch_id,
      orientation,
      index_fileName
    );
    res.json(result);
  } catch (error) {
    res.status(error);
  }
};

const bundleList = async (req, res) => {
  try {
    if (!req.params)
      return new StatusCode.INVALID_ARGUMENT("Request Params is empty!");
    const { page } = req.params;
    const result = await Bundle.bundleList(page);
    res.json(result);
  } catch (error) {
    res.status(error);
  }
};

const bundleUpdate = async (req, res) => {
  try {
    const { name, type, prod_patch_id, orientation, index_fileName } = req.body;
    const { id } = req.params;

    if (
      name == "" ||
      type == "" ||
      prod_patch_id == "" ||
      orientation == "" ||
      index_fileName == ""
    )
      return res.status(400).json("Please provide all required fields");

    const result = await Bundle.bundleUpdate(
      id,
      name,
      type,
      prod_patch_id,
      orientation,
      index_fileName
    );
    res.json(result);
  } catch (error) {
    res.status(error);
  }
};

const bundleDelete = async (req, res) => {
  try {
    console.log(`This is bunndle Controller delete ${req.params.id}`);
    const result = await Bundle.bundleDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error);
  }
};

const bundleDetail = async (req, res) => {
  try {
    const result = await Bundle.bundleDetail(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error);
  }
};

module.exports = {
  bundleCreate,
  bundleList,
  bundleUpdate,
  bundleDelete,
  bundleDetail,
};
