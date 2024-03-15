const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const saveFileToUploads = async (unicodeString) => {
  try {
    const uid = uuidv4();
    const filename = `${uid}.zip`;
    const filePath = path.join(__dirname, "../uploads", filename);

    // Convert the Unicode string to a Buffer containing binary data
    const buffer = Buffer.from(unicodeString, "base64");

    // Write the binary data to a file
    await fs.writeFile(filePath, buffer);

    return filePath;
  } catch (error) {
    return {
      success: false,
      error: "Error decoding unicode string to file",
      details: error,
    };
  }
};

module.exports = saveFileToUploads;
