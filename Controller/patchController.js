const Patch = require("../models/patchModel");
const unzipper = require("unzipper");
const fs = require("fs-extra");
const path = require("path");

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

const uploadFile = async (req, res) => {
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

// const uploadFile = async (req, res) => {
//   try {
//     // Handle single file upload using multer middleware
//     upload.single("file")(req, res, async function (err) {
//       if (err) {
//         // Handle multer errors
//         return res.status(500).json({ message: err.message });
//       }
//       const zipFile = req.file;
//       // const buffer = Buffer.from("zipFile");
//       // Check if req.file is defined and has a buffer property
//       if (!req.file || !req.file.buffer) {
//         return res.status(400).json({
//           message: "Uploaded file is missing or empty",
//           zipFile,
//           // buffer,zipFile
//         });
//       }

//       // File uploaded successfully

//       try {
//         const extractedFiles = [];
//         const archive = await unzipper.Open.buffer(zipFile.buffer);

//         // Iterate through each file in the archive
//         await Promise.all(
//           archive.files.map(async (file) => {
//             const content = await file.buffer();
//             extractedFiles.push({
//               fileName: file.path,
//               fileContent: content.toString(),
//             });
//           })
//         );

//         res
//           .status(200)
//           .json({ message: "File uploaded successfully", extractedFiles });
//       } catch (error) {
//         // Handle unzipper errors
//         res.status(500).json({ message: error.message });
//       }
//     });
//   } catch (error) {
//     // Handle other errors
//     res.status(500).json({ message: error.message });
//   }
// };

const patchCreate = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Request body is empty!" });
    const result = await Patch.patchCreate(req.body);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchList = async (req, res) => {
  try {
    const result = await Patch.patchList();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchUpdate = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Request body is empty!" });
    const result = await Patch.patchUpdate(req.params.id, req.body);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const patchDelete = async (req, res) => {
  try {
    const result = await Patch.patchDelete(req.params.id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  patchCreate,
  patchList,
  patchUpdate,
  patchDelete,
  uploadFile,
  fileRead,
  fileDelete,
};
