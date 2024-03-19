const fs = require("fs-extra");
const unzipper = require("unzipper");

const checkFilesInZip = async (zipFilePath, fileName) => {
  return new Promise((resolve, reject) => {
    let fileFound = false; // Flag to indicate if the file is found

    fs.createReadStream(zipFilePath)
      .pipe(unzipper.Parse())
      .on("entry", (entry) => {
        if (entry.path === fileName) {
          fileFound = true; // Set flag to true if file is found
          entry.autodrain();
        } else {
          entry.autodrain();
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("finish", () => {
        resolve(fileFound); // Resolve with true if file is found, false otherwise
      });
  });
};

module.exports = checkFilesInZip;
