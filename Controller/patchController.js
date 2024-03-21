const Patch = require("../models/patchModel");
const deleteFile = require("../middleware/deleteFile");
const getFile_Patch = require("../middleware/getFile_Patch");
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
    const { bundle_id, patch_id, remark, file_Patch } = req.body;
    if (bundle_id == "" || patch_id == "" || remark == "" || file_Patch == "")
      return res.status(400).json("Please provide all required fields");
    console.log(req.body);
    const file_PatchDecode = await getFile_Patch({ file_Patch, bundle_id });

    console.log(` This is from PatchCreate - ${file_PatchDecode.code}`);
    console.log(file_PatchDecode.data);
    if (file_PatchDecode.code == 200) {
      try {
        const result = await Patch.patchCreate(
          bundle_id,
          patch_id,
          remark,
          file_PatchDecode.data
        );
        console.log(result);
        res.json(result);
      } catch (error) {
        await deleteFile(file_PatchDecode);

        res.status(error);
      }
    } else if (file_PatchDecode.code == 400) {
      res.json(new StatusCode.INVALID_ARGUMENT());
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
    const { patch_id, remark, environment } = req.body;
    const { id } = req.params;

    if (patch_id == "" || remark == "" || environment == "")
      return res.status(400).json("Please provide all required fields");

    const result = await Patch.patchUpdate(id, patch_id, remark, environment);
    res.json(result);
  } catch (error) {
    res.status(error);
  }
};

const patchDelete = async (req, res) => {
  try {
    const filePatch = await Patch.getFile_PathById(req.params.id);
    if (filePatch.code == 404) {
      console.log("404");
      return res.json(new StatusCode.NOT_FOUND("File Path Not Found"));
    }
    if (filePatch.code == 200) {
      console.log(" 200");
      const delFile = await deleteFile(filePatch.data[0].file_Patch);
      console.log(`This is delFiel ${delFile}`);
      if (delFile) {
        await Patch.patchDelete(req.params.id);
      }
      const result = await Patch.patchDelete(req.params.id);
      res.json(result);
    }
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
