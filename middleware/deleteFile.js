const fs = require("fs-extra");
const StatusCode = require("../helper/status_code_helper");

const deleteFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        // Handle error while deleting file
        reject(new StatusCode.UNKNOWN(err));
      } else {
        console.log("File deleted successfully");
        resolve(new StatusCode.OK(null, "File deleted successfully"));
      }
    });
  });
};
module.exports = deleteFile;
