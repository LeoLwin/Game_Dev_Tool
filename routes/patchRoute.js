const router = require("express").Router();

const {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  patchByBundle_Id,
} = require("../Controller/patchController");
const { route } = require("./bundleRoute");

// const validateToken = require("../middleware/validateToken");
// // middleware that is specific to this router
// router.use(validateToken);

router.route("/createPatch").post(patchCreate);
router.route("/listPatch/:page").get(patchList);
router.route("/updatePatch/:id").put(patchUpdate);
router.route("/deletePatch/:id").delete(patchDelete);
router.route("/patchByBundle_Id/:id").get(patchByBundle_Id);

module.exports = router;
