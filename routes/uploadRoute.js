const router = require("express").Router();

const {
  fileUpload,
  fileRead,
  fileDelete,
} = require("../Controller/uploadController");

// const validateToken = require("../middleware/validateToken");
// // middleware that is specific to this router
// router.use(validateToken);

router.route("/fileUpload").post(fileUpload);
router.route("/fileRead").get(fileRead);
router.route("/fileDelete").delete(fileDelete);

module.exports = router;
