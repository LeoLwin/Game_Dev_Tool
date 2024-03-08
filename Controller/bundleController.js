const Bundle = require("../models/bundleModel");

const bundleCreate = async (req, res) => {
  try {
    const result = await Bundle.bundleCreate();
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.messageI });
  }
};
module.exports = { bundleCreate };
