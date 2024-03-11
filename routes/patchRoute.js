const router = require("express").Router();

const {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
} = require("../Controller/patchController");

router.route("/createPatch").post(patchCreate);
router.route("/listPatch").get(patchList);
router.route("/updatePatch/:id").put(patchUpdate);
router.route("/deletePatch/:id").delete(patchDelete);

module.exports = router;
