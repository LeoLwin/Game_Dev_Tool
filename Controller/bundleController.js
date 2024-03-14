const Bundle = require("../models/bundleModel");

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
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const result = await Bundle.bundleCreate(
      name,
      type,
      prod_patch_id,
      orientation,
      index_fileName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bundleList = async (req, res) => {
  try {
    if (!req.params)
      return res.status(400).json({ message: "Request Params is empty!" });
    const { page } = req.params;
    const result = await Bundle.bundleList(page);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    const result = await Bundle.bundleUpdate(
      id,
      name,
      type,
      prod_patch_id,
      orientation,
      index_fileName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bundleDelete = async (req, res) => {
  try {
    const result = await Bundle.bundleDelete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bundleDetail = async (req, res) => {
  try {
    const result = await Bundle.bundleDetail(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bundleCreate,
  bundleList,
  bundleUpdate,
  bundleDelete,
  bundleDetail,
};
