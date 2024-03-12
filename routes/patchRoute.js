const router = require("express").Router();

const {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  uploadFile,
  fileRead,
  fileDelete,
} = require("../Controller/patchController");

const validateToken = require("../middleware/validateToken");
// middleware that is specific to this router
router.use(validateToken);

router.route("/createPatch").post(patchCreate);
router.route("/listPatch").get(patchList);
router.route("/updatePatch/:id").put(patchUpdate);
router.route("/deletePatch/:id").delete(patchDelete);
router.route("/fileUpload").post(uploadFile);
router.route("/readFile").get(fileRead);
router.route("/deleteFile").delete(fileDelete);

module.exports = router;
