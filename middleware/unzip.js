require("dotenv").config();
const fs = require("fs-extra");
const path = require("path");
const unzipper = require("unzipper");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder for uploaded files
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // Specify the filename for uploaded files
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(zip)$/)) {
    // Reject file if it doesn't have a .zip extension
    return cb(new Error("Only ZIP files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

const unzip = async (req, res) => {
  upload.single("file")(req, res, function (err) {
    if (err) {
      // Handle multer errors
      return res.status(500).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const zipFilePath = req.file.path;
    const extractDir = "./uploads";
    const fileNameToCheck = "khl" || "gg" || "bb"; // Specify the file name you want to check

    checkFileInZip(zipFilePath, fileNameToCheck)
      .then((exists) => {
        if (!exists) {
          fs.unlink(zipFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting zip file:", unlinkErr);
            }
            res.status(200).json({
              message: "File unzipped successfully",
              zipFilePath,
            });
          });
          return res.status(404).json({ message: "File not found in zip" });
        } else
          fs.createReadStream(zipFilePath)
            .pipe(unzipper.Extract({ path: extractDir }))
            .on("error", (err) => {
              res
                .status(500)
                .json({ error: "Error unzipping file", details: err });
            })
            .on("finish", () => {
              // Delete the original zip file
              fs.unlink(zipFilePath, (unlinkErr) => {
                if (unlinkErr) {
                  console.error("Error deleting zip file:", unlinkErr);
                }
                res.status(200).json({
                  message: "File unzipped successfully",
                  zipFilePath,
                });
              });
            });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "Error checking file in zip", details: err });
      });
  });
};

// module.exports = unzip;
