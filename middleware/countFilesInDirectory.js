const fs = require("fs-extra");

// Function to count files in a directory
const countFilesInDirectory = async (directoryPath) => {
  try {
    const files = await fs.readdir(directoryPath);
    return files.length;
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
};

module.exports = countFilesInDirectory;
