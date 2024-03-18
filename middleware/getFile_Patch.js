require("dotenv").config();
const fs = require("fs-extra");
const path = require("path");
const toDecode = require("../middleware/decodeUnicodeToFile");
const deleteFile = require("../middleware/deleteFile");
const checkFileInZip = require("../middleware/checkFIleInZip");
const saveFileToUploads = require("../middleware/saveFileToUploads");

const getFile_Patch = async (data) => {
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

module.exports = getFile_Patch;
