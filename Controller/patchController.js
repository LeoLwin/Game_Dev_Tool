const Patch = require("../models/patchModel");

const patchCreate = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Request body is empty!" });
    const result = await Patch.patchCreate(req.body);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchList = async (req, res) => {
  try {
    const result = await Patch.patchList();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchUpdate = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Request body is empty!" });
    const result = await Patch.patchUpdate(req.params.id, req.body);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchDelete = async (req, res) => {
  try {
    const result = await Patch.patchDelete(req.params.id);
    res.status(200).json({ result });
    // console.log("Hello")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { patchCreate, patchList, patchUpdate, patchDelete };
