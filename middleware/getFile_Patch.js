require("dotenv").config();
const fs = require("fs-extra");
const path = require("path");
const toDecode = require("../middleware/decodeUnicodeToFile");
const deleteFile = require("../middleware/deleteFile");
const checkFilesInZip = require("./checkFilesInZip");
const saveFileToUploads = require("../middleware/saveFileToUploads");
const countFilesInZip = require("./countFilesInDirectory");
const { Extract } = require("unzipper");
const extractZipContents = require("./extractZipContents");
const StatusCode = require("../helper/status_code_helper");

// const getFile_Patch = async (data) => {
//   try {
//     const { file_Patch, bundle_id } = data;
//     const file = file_Patch;
//     const id = bundle_id;

//     const filePath = await toDecode(file);
//     const fileNames = ["khl", "gg", "bb", "bf"]; // Array of file names to check

//     // Check if any file exists in the ZIP archive
//     const results = await Promise.all(
//       fileNames.map(async (fileName) => {
//         const result = await checkFilesInZip(filePath, fileName); // Corrected to return the result
//         console.log(`This is isisisi ${fileName} : ${result}`);
//         return result;
//       })
//     );
//     console.log(`This is results : ${results}`);
//     console.log(`This is resluts.length : ${results.length}`);
//     console.log(`This is fileNames.length : ${fileNames.length}`);
//     // Check if all files exist and no additional files are present

//     console.log(`Results: ${results}`);

//     const trueResults = results.filter((result) => result === true);
//     console.log(`True results: ${trueResults}`);

//     console.log(`Number of files found: ${trueResults.length}`);
//     console.log(`Number of files found: ${fileNames.length}`);
//     const allExist = trueResults.length === fileNames.length;

//     // const allExist =
//     //   results.every((result) => result) && results.length === fileNames.length;
//     console.log(allExist);

//     if (allExist) {
//       // If all files exist and no additional files are present, return success message
//       const uploadFilePatch = await saveFileToUploads({ file, id });
//       await deleteFile(filePath);
//       console.log("Successd");
//       return uploadFilePatch;
//     } else {
//       // If not all files exist or additional files are present, return failure message
//       console.log("False");
//       throw new Error(
//         "One or more required files are missing or additional files exist"
//       );
//     }
//   } catch (error) {
//     return { message: error.message };
//   }
// };

const getFile_Patch = async (data) => {
  try {
    const { file_Patch, bundle_id } = data;
    console.log(data);
    // const file = file_Patch;
    const file = file_Patch.slice("data:application/zip;base64,".length);
    console.log(`1--${file}`);
    const id = bundle_id;
    const filePath = await toDecode(file);
    console.log(`2-- ${filePath}`);
    const fileNames = ["khl", "bb", "gg"]; // Array of file names to check

    // Check if any file exists in the ZIP archive
    const results = await Promise.all(
      fileNames.map(async (fileName) => {
        const result = await checkFilesInZip(filePath, fileName); // Corrected to return the result
        console.log(`Result for ${fileName}: ${result}`);
        return result;
      })
    );
    console.log(`${results}`);

    const count = await countFilesInZip(filePath);
    const trueResults = results.filter((result) => result === true);
    console.log(`Number of file count : ${count}`);
    console.log(`Number of files found: ${trueResults.length}`);
    console.log(`Number of files expected: ${fileNames.length}`);
    // Check if count, trueResults.length, and fileNames.length are equal
    const allExist =
      count === trueResults.length && trueResults.length === fileNames.length;

    if (allExist) {
      // If all files exist and no additional files are present, return success message
      const extractfilePatch = await extractZipContents(filePath, id);
      // const uploadFilePatch = await saveFileToUploads({ file, id });
      // console.log(uploadFilePatch);
      console.log(extractfilePatch);
      await deleteFile(filePath);
      console.log("Success");
      return new StatusCode.OK(extractfilePatch);
    } else {
      // If not all files exist or additional files are present, return failure message
      console.log("False");
      await deleteFile(filePath);
      return new StatusCode.INVALID_ARGUMENT(
        "One or more files have either decreased or increased."
      );
    }
  } catch (error) {
    if (filePath) {
      await deleteFile(filePath);
    }

    return new StatusCode.UNKNOWN(null);
  }
};

module.exports = getFile_Patch;
