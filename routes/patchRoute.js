const router = require("express").Router();

const {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  uploadFile,
  fileRead,
} = require("../Controller/patchController");

router.route("/createPatch").post(patchCreate);
router.route("/listPatch").get(patchList);
router.route("/updatePatch/:id").put(patchUpdate);
router.route("/deletePatch/:id").delete(patchDelete);
router.route("/fileUpload").post(uploadFile);
router.route("/readFile").get(fileRead);

module.exports = router;
