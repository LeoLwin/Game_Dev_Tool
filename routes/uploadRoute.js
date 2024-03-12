const router = require("express").Router();

const {
  fileUpload,
  fileRead,
  fileDelete,
  uploadFileS3COn,
} = require("../Controller/uploadController");

// const validateToken = require("../middleware/validateToken");
// // middleware that is specific to this router
// router.use(validateToken);

router.route("/fileUpload").post(fileUpload);
router.route("/fileRead").get(fileRead);
router.route("/fileDelete").delete(fileDelete);
router.route("/s3File").post(uploadFileS3COn);

module.exports = router;