const fs = require("fs-extra");
const StatusCode = require("../helper/status_code_helper");

const deleteFolder = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.remove(filePath, (err) => {
      if (err) {
        console.error("Error deleting file/directory:", err);
        // Handle error while deleting file/directory
        reject(new StatusCode.UNKNOWN(err));
      } else {
        console.log("File/directory deleted successfully");
        resolve(new StatusCode.OK(null, "File/directory deleted successfully"));
      }
    });
  });
};

module.exports = deleteFolder;
