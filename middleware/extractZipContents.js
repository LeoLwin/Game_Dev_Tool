const fs = require("fs-extra");
const path = require("path");
const AdmZip = require("adm-zip");
const { v4: uuidv4 } = require("uuid");

const extractZipContents = async (filePath, id) => {
  try {
    const uploadsPath = path.join(__dirname, "../uploads");
    const idFolderPath = path.join(uploadsPath, id);
    const extractDir = path.join(idFolderPath, `extract-${id}${uuidv4()}`);

    console.log(`This is extractZipContents zipFilePath: ${filePath}`);
    console.log(`This is extractZipContents id: ${id}`);

    // Ensure the uploads directory exists
    await fs.ensureDir(uploadsPath);

    // Ensure the folder with the ID exists or create it
    await fs.ensureDir(idFolderPath);

    // Create an instance of AdmZip using the provided zip file path
    const zip = new AdmZip(filePath);

    // Extract the contents of the zip file to the 'extract' directory inside the ID folder
    zip.extractAllTo(extractDir, /* overwrite */ true);

    // Return the path to the 'extract' directory where the contents are extracted
    return extractDir;
  } catch (error) {
    console.error("Error extracting zip contents:", error);
    return null;
  }
};

module.exports = extractZipContents;
