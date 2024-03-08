const router = require("express").Router();

const { bundleCreate } = require("../Controller/bundleController");

router.route("/createBundle").post(bundleCreate);
module.exports = router;
