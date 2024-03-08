require("dotenv").config();
const axios = require("axios");
const DB = require("./dbConnection");
const jwt = require("jsonwebtoken");

const bundleCreate = async () => {
  try {
    return {
      success: true,
      message: "Bundle Model is here!",
    };
  } catch (error) {
    console.error("Error in Bundle Model:", error);
    throw error;
  }
};

module.exports = { bundleCreate };
