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

const fileUpload = async (req, res) => {
  try {
    // Handle single file upload using multer middleware
    upload.single("file")(req, res, function (err) {
      if (err) {
        // Handle multer errors
        return res.status(500).json({ message: err.message });
      }
      // File uploaded successfully
      const file = req.file;
      const filePath = req.protocol + "://" + req.get("host") + "/" + file.path;

      res
        .status(200)
        .json({ message: "File uploaded successfully", file, filePath });
    });
  } catch (error) {
    // Handle other errors
    res.status(500).json({ message: error.message });
  }
};

const fileRead = async (req, res) => {
  const uploadFolderPath = path.join(__dirname, "../uploads");
  fs.readdir(uploadFolderPath, (err, files) => {
    if (err) {
      console.error("Error reading upload folder:", err);
      res.status(500).json({ error: "Failed to read upload folder" });
      return;
    }

    const fileData = files.map((file) => ({
      filename: file,
      path: path.join(uploadFolderPath, file),
    }));

    res.json({ files: fileData });
  });
};

const fileDelete = async (req, res) => {
  try {
    const filePath = req.body.filePath;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        // Handle error while deleting file
        res.status(500).json({ message: err });
      } else {
        console.log("File deleted successfully");
        res.status(200).json("File deleted successfully");
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    const fileNameToCheck = "khl.txt"; // Specify the file name you want to check

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

// const unzip = async (req, res) => {
//   upload.single("file")(req, res, function (err) {
//     if (err) {
//       // Handle multer errors
//       return res.status(500).json({ message: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const zipFilePath = req.file.path;
//     const extractDir = "./uploads";

//     fs.createReadStream(zipFilePath)
//       .pipe(unzipper.Extract({ path: extractDir }))
//       .on("error", (err) => {
//         res.status(500).json({ error: "Error unzipping file", details: err });
//       })
//       .on("finish", () => {
//         // Delete the original zip file
//         fs.unlink(zipFilePath, (unlinkErr) => {
//           if (unlinkErr) {
//             console.error("Error deleting zip file:", unlinkErr);
//           }

//           res.status(200).json({
//             message: "File unzipped successfully",
//             zipFilePath,
//           });
//         });
//       });
//   });
// };

module.exports = { fileUpload, fileDelete, fileRead, unzip };
