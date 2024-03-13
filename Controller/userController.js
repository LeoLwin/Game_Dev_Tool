const User = require("../models/userModel");

const googleLogin = async (req, res) => {
  try {
    const url = await User.googleLogin();
    // res.redirect(url);
    res.status(200).json(url);
  } catch (error) {
    console.error("Error in Google login:", error);
    res.status(500).json({ message: error.message });
  }
};

const googleCallBack = async (req, res) => {
  try {
    // const code = req.query.code;
    const result = await User.googleCallBack(req.query.code);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  googleLogin,
  googleCallBack,
};
