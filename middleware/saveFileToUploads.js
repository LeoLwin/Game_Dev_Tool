const fs = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const saveFileToUploads = async (data) => {
  try {
    const { file, id } = data;
    const uid = uuidv4();
    const idFolderName = `${id}`;
    const filename = `${uid}.zip`;
    const filePath = path.join(__dirname, "../uploads", idFolderName, filename);

    // Check if the file already exists
    if (await fs.pathExists(filePath)) {
      console.log("File exists");
      const actualFilePath = path.join(filePath, filename);
      const buffer = Buffer.from(file, "base64");
      await fs.appendFile(actualFilePath, buffer);
      return actualFilePath; // Return the path of the existing file
    } else {
      console.log("File doesn't exist!");
      const directoryPath = path.join(__dirname, "../uploads", idFolderName);
      const actualFilePath = path.join(directoryPath, filename);
      await fs.ensureDir(directoryPath);
      await fs.writeFile(filePath, Buffer.from(file, "base64"));
      return actualFilePath; // Return the path of the new file
    }
  } catch (error) {
    return {
      success: false,
      error: "Error decoding unicode string to file",
      details: error,
    };
  }
};

module.exports = saveFileToUploads;
