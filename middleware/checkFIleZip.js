const fs = require("fs").promises;

const checkFileInZip = async (zipFilePath, fileName) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(zipFilePath)
      .pipe(unzipper.Parse())
      .on("entry", (entry) => {
        if (entry.path === fileName) {
          resolve(true);
        } else {
          entry.autodrain();
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("finish", () => {
        resolve(false);
      });
  });
};

module.exports = checkFileInZip;
