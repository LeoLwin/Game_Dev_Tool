const fs = require("fs-extra");
const StatusCode = require("../helper/status_code_helper");

const deleteFile = async (filePath) => {
  try {
    await fs.remove(filePath); // Use fs-extra's remove function to delete files or directories
    console.log("File or directory deleted successfully:", filePath);
    return true;
  } catch (error) {
    console.error("Error deleting file or directory:", error);
    return false;
  }
};

module.exports = deleteFile;
