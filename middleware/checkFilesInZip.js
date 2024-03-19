const fs = require("fs-extra");
const unzipper = require("unzipper");

// const checkFilesInZip = async (zipFilePath, fileName) => {
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(zipFilePath)
//       .pipe(unzipper.Parse())
//       .on("entry", (entry) => {
//         if (entry.path === fileName) {
//           resolve(true);
//         } else {
//           entry.autodrain();
//         }
//       })
//       .on("error", (err) => {
//         reject(err);
//       })
//       .on("finish", () => {
//         resolve(false);
//       });
//   });
// };

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

// const checkFilesInZip = async (zipFilePath, expectedFileNames) => {
//   return new Promise((resolve, reject) => {
//     let filesFound = new Set(expectedFileNames);
//     let filesCount = expectedFileNames.length;
//     fs.createReadStream(zipFilePath)
//       .pipe(unzipper.Parse())
//       .on("entry", (entry) => {
//         const fileName = entry.path;
//         if (filesFound.has(fileName)) {
//           filesFound.delete(fileName);
//         } else {
//           // If an unexpected file is found, stop parsing and reject the promise
//           entry.autodrain();
//           reject(new Error(`Unexpected file found: ${fileName}`));
//         }
//       })
//       .on("error", (err) => {
//         reject(err);
//       })
//       .on("finish", () => {
//         if (filesFound.size === 0 && filesCount === 0) {
//           // All expected files found and no extra files present
//           resolve(true);
//         } else {
//           // Not all expected files found or extra files present
//           resolve(false);
//         }
//       });
//   });
// };

module.exports = checkFilesInZip;
