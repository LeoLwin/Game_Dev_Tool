const Patch = require("../models/patchModel");
const unzipper = require("unzipper");
const { unzip, toBase64, fileDelete } = require("./uploadController");
const e = require("express");
const deleteFile = require("../middleware/deleteFile");

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
    const { bundle_id, patch_id, remark, file_Patch } = req.body;
    if (bundle_id == "" || patch_id == "" || remark == "" || file_Patch == "")
      return res.status(400).json("Please provide all required fields");

    const file_PatchDecode = await toBase64({ file_Patch, bundle_id });

    const result = await Patch.patchCreate(
      bundle_id,
      patch_id,
      remark,
      file_PatchDecode
    );
    res.status(200).json("New Patch is created.");
  } catch (error) {
    res.status(500).json(error);
  }
};

const patchList = async (req, res) => {
  try {
    const result = await Patch.patchList();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const patchUpdate = async (req, res) => {
  try {
    const { patch_id, remark } = req.body;
    const { id } = req.params;

    if (patch_id == "" || remark == "")
      return res.status(400).json("Please provide all required fields");

    const result = await Patch.patchUpdate(id, patch_id, remark);
    res.status(200).json(`ID : ${id} Patch is Updated.`);
  } catch (error) {
    res.status(500).json(error);
  }
};

const patchDelete = async (req, res) => {
  try {
    const filePatch = await Patch.getFile_PathById(req.params.id);
    console.log(filePatch[0].file_Patch);
    const delFile = await deleteFile(filePatch[0].file_Patch);
    if (delFile) {
      const result = await Patch.patchDelete(req.params.id);
      res.status(200).json("Patch is deleted.");
      
    }
    return result;
  } catch (error) {
    res.status(500).json(error);
  }
};

const patchByBundle_Id = async (req, res) => {
  try {
    const result = await Patch.patchByBundle_Id(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// const getFile_PathById = async (id) => {
//   try {
//     const result = await Patch.getFile_PathById(id);
//     return result;
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

module.exports = {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  patchByBundle_Id,
};
