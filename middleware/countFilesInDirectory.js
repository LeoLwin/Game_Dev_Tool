const AdmZip = require("adm-zip");

// Function to count files in a zip file
const countFilesInZip = (zipFilePath) => {
  try {
    const zip = new AdmZip(zipFilePath);
    const zipEntries = zip.getEntries();
    return zipEntries.length;
  } catch (error) {
    console.error("Error reading zip file:", error);
    throw error;
  }
};

module.exports = countFilesInZip;
