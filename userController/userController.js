const User = require("../models/model");

const googleLogin = async (req, res) => {
  try {
    const url = await User.googleLogin();
    res.redirect(url);
  } catch (error) {
    console.error("Error in Google login:", error);
    res.status(500).json({ message: error.message });
  }
};

const googleCallBack = async (req, res) => {
  try {
    // const code = req.query.code;
    const result = await User.googleCallBack(req.query.code);
    return result;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  googleLogin,
  googleCallBack,
};
