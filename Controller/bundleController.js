const Bundle = require("../models/bundleModel");

const bundleCreate = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Request body is empty!" });
    const result = await Bundle.bundleCreate(req.body);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bundleList = async (req, res) => {
  try {
    if (!req.params)
      return res.status(400).json({ message: "Request Params is empty!" });
    const { page } = req.params;
    const result = await Bundle.bundleList(page);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bundleUpdate = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Request body is empty!" });
    const result = await Bundle.bundleUpdate(req.params.id, req.body);
    // const result = req.body;
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bundleDelete = async (req, res) => {
  try {
    const result = await Bundle.bundleDelete(req.params.id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bundleDetail = async (req, res) => {
  try {
    const result = await Bundle.bundleDetail(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bundleDetails = async (req, res) => {
  try {
    const result = await Bundle.bundleDetails(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bundleCreate,
  bundleList,
  bundleUpdate,
  bundleDelete,
  bundleDetail,
  bundleDetails,
};
