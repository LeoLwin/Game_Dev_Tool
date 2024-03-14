const Patch = require("../models/patchModel");
const unzipper = require("unzipper");

const patchCreate = async (req, res) => {
  try {
    const { bundle_id, patch_id, remark } = req.body;
    if (bundle_id == "" || patch_id == "" || remark == "")
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    const result = await Patch.patchCreate(bundle_id, patch_id, remark);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchList = async (req, res) => {
  try {
    const result = await Patch.patchList();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchUpdate = async (req, res) => {
  try {
    const { patch_id, remark } = req.body;
    const { id } = req.params;

    if (patch_id == "" || remark == "")
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    const result = await Patch.patchUpdate(id, patch_id, remark);
    res.status(200).json(result);
    // res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchDelete = async (req, res) => {
  try {
    const result = await Patch.patchDelete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchByBundle_Id = async (req, res) => {
  try {
    const result = await Patch.patchByBundle_Id(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  patchByBundle_Id,
};
