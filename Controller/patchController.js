const Patch = require("../models/patchModel");
const unzipper = require("unzipper");
const { unzip } = require("./uploadController");
const StatusCode = require("../helper/status_code_helper");

// const patchCreate = async (req, res) => {
//   try {
//     const { bundle_id, patch_id, remark } = req.body;
//     if (bundle_id == "" || patch_id == "" || remark == "")
//       return res
//         .status(400)
//         .json({ message: "Please provide all required fields" });
//     const result = await Patch.patchCreate(bundle_id, patch_id, remark);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const patchCreate = async (req, res) => {
  try {
    const { bundle_id, patch_id, remark } = req.body;
    if (bundle_id == "" || patch_id == "" || remark == "")
      return res.json(
        new StatusCode.INVALID_ARGUMENT("Please provide all required fields")
      );
    const result = await Patch.patchCreate(bundle_id, patch_id, remark);
    res.json(new StatusCode.OK(result));
  } catch (error) {
    res.json(new StatusCode.UNKNOWN());
  }
};

const patchList = async (req, res) => {
  try {
    const result = await Patch.patchList();
    res.json(new StatusCode.OK(result));
  } catch (error) {
    res.json(new StatusCode.UNKNOWN());
  }
};

const patchUpdate = async (req, res) => {
  try {
    const { patch_id, remark } = req.body;
    const { id } = req.params;

    if (patch_id == "" || remark == "")
      return res.json(
        new StatusCode.INVALID_ARGUMENT("Please provide all required fields")
      );
    const result = await Patch.patchUpdate(id, patch_id, remark);
    res.json(new StatusCode.OK(result));
  } catch (error) {
    res.json(new StatusCode.UNKNOWN());
  }
};

const patchDelete = async (req, res) => {
  try {
    const result = await Patch.patchDelete(req.params.id);
    res.json(new StatusCode.OK(result));
  } catch (error) {
    res.json(new StatusCode.UNKNOWN());
  }
};

const patchByBundle_Id = async (req, res) => {
  try {
    const result = await Patch.patchByBundle_Id(req.params.id);
    res.json(new StatusCode.OK(result));
  } catch (error) {
    res.json(new StatusCode.UNKNOWN());
  }
};

module.exports = {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  patchByBundle_Id,
};
