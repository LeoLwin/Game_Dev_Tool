const isZipFile = (decodedFile) => {
    // Check if the first two bytes match the ZIP file signature "PK"
    if (decodedFile[0] === 0x50 && decodedFile[1] === 0x4B) {
      return true;
    }
    return false;
  };
  
  module.exports = isZipFile;
  


