const Patch = require("../models/patchModel");
const deleteFile = require("../middleware/deleteFile");
const getFile_Patch = require("../middleware/getFile_Patch");

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

    const file_PatchDecode = await getFile_Patch({ file_Patch, bundle_id });
    if (file_PatchDecode === null) {
      res.status(404).json("One or more data is additonal or missing!");
    } else {
      try {
        const result = await Patch.patchCreate(
          bundle_id,
          patch_id,
          remark,
          file_PatchDecode
        );
        console.log(result);
        res.json(result);
      } catch (error) {
        await deleteFile(file_PatchDecode);
        res.status(error);
      }
    }
  } catch (error) {
    res.status(error);
  }
};

const patchList = async (req, res) => {
  try {
    if (!req.params)
      return new StatusCode.INVALID_ARGUMENT("Request Params is empty!");
    const { page } = req.params;
    const result = await Patch.patchList(page);
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
    res.json(result);
  } catch (error) {
    res.status(error);
  }
};

const patchDelete = async (req, res) => {
  try {
    console.log(req.params.id);
    const filePatch = await Patch.getFile_PathById(req.params.id);
    console.log(filePatch[0].file_Patch);
    const delFile = await deleteFile(filePatch[0].file_Patch);
    if (delFile) {
      await Patch.patchDelete(req.params.id);
    }
    const result = await Patch.patchDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error);
  }
};

const patchByBundle_Id = async (req, res) => {
  try {
    const result = await Patch.patchByBundle_Id(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(error);
  }
};

module.exports = {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  patchByBundle_Id,
};
