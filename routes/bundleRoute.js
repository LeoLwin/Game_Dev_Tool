const router = require("express").Router();

const {
  bundleCreate,
  bundleList,
  bundleUpdate,
  bundleDelete,
  bundleDetail,
} = require("../Controller/bundleController");

router.route("/createBundle").post(bundleCreate);
router.route("/listBundle/:page").get(bundleList);
router.route("/updateBundle/:id").put(bundleUpdate);
router.route("/deleteBundle/:id").delete(bundleDelete);
router.route("/detailBundle/:id").get(bundleDetail);
module.exports = router;
