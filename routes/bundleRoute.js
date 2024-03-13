const router = require("express").Router();

const {
  bundleCreate,
  bundleList,
  bundleUpdate,
  bundleDelete,
  bundleDetail,
  bundleDetails,
} = require("../Controller/bundleController");

// const validateToken = require("../middleware/validateToken");
// // middleware that is specific to this router
// router.use(validateToken);

router.route("/createBundle").post(bundleCreate);
router.route("/listBundle/:page").get(bundleList);
router.route("/updateBundle/:id").put(bundleUpdate);
router.route("/deleteBundle/:id").delete(bundleDelete);
router.route("/detailBundle/:id").get(bundleDetail);
router.route("/detailsBundle/:id").get(bundleDetails);
module.exports = router;
