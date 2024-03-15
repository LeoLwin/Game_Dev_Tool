const fs = require("fs").promises;
const path = require("path");
const { isZipFile } = require("./isZipFile"); // Import the isZipFile function
const checkFileInZip = require("./checkFIleZip");
// const filePath = path.join(__dirname, "../temps", "decodedFile.zip");

const decodeUnicodeToFile = async (unicodeString) => {
  const filePath = path.join(__dirname, "../temps", "decodedFile.zip");
  try {
    // Convert the Unicode string to a Buffer containing binary data
    const buffer = Buffer.from(unicodeString, "base64");

    // Write the binary data to a file
    await fs.writeFile(filePath, buffer);

    // // Check if the specified file exists in the ZIP archive

    return filePath;
  } catch (error) {
    return {
      success: false,
      error: "Error decoding unicode string to file",
      details: error,
    };
  }
};

module.exports = decodeUnicodeToFile;
