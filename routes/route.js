const router = require("express").Router();
const {
  googleLogin,
  googleCallBack,
} = require("../userController/userController");

router.route("/googleLogin").get(googleLogin);
router.route("/auth/google/callback").get(googleCallBack);

module.exports = router;
