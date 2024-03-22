require("dotenv").config();
const fs = require("fs-extra");
const path = require("path");
const multer = require("multer");
const toDecode = require("../middleware/decodeUnicodeToFile");
const fileFilter = require("../middleware/isZipFile");
const deleteFile = require("../middleware/deleteFile");
const checkFileInZip = require("../middleware/checkFilesInZip");
const saveFileToUploads = require("../middleware/saveFileToUploads");

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

// const fileFilter = (req, file, cb) => {
//   if (!file.originalname.match(/\.(zip)$/)) {
//     // Reject file if it doesn't have a .zip extension
//     return cb(new Error("Only ZIP files are allowed!"), false);
//   }
//   cb(null, true);
// };

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
      if (!file) {
        // No file uploaded
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Construct file path
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

const fileDelete = async (path) => {
  try {
    // const filePath = req.body.filePath;
    fs.unlink(path, (err) => {
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

const toBase64 = async (data) => {
  try {
    const { file_Patch, bundle_id } = data;
    const file = file_Patch;
    const id = bundle_id;

    const filePath = await toDecode(file);
    const fileNames = ["khl", "gg", "bb"]; // Array of file names to check

    // Check if any file exists in the ZIP archive
    const results = await Promise.all(
      fileNames.map(async (fileName) => {
        return await checkFileInZip(filePath, fileName); // Corrected to return the result
      })
    );
    console.log(`This is results : ${results}`);
    console.log(`This is resluts.length : ${results.length}`);
    console.log(`This is fileNames.length : ${fileNames.length}`);
    // Check if all files exist and no additional files are present

    const allExist =
      results.every((result) => result) && results.length === fileNames.length;
    console.log(allExist);
    if (allExist) {
      // If all files exist and no additional files are present, return success message
      const uploadFilePatch = await saveFileToUploads({ file, id });
      await deleteFile(filePath);
      return uploadFilePatch;
    } else {
      // If not all files exist or additional files are present, return failure message
      console.log("False");
      return {
        message:
          "One or more required files are missing or additional files exist",
      };
    }
    res.status(200).json(allExist);
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = { fileUpload, fileDelete, fileRead, toBase64 };
