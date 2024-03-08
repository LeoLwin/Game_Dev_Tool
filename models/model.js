const axios = require("axios");
const DB = require("../models/dbConnection");

require("dotenv").config();

const googleLogin = async () => {
  try {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.Google_Client_Id}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email`;
    return url;
  } catch (error) {
    console.error("Error in Google login:", error);
    throw error;
  }
};

const googleCallBack = async (code) => {
  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.Google_Client_Id,
      client_secret: process.env.Google_Client_Secret,
      code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code",
    });
    const { access_token, id_token } = data;
    console.log(data);
    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const userData = {
      name: profile.name,
      social_id: profile.id,
      email: profile.email,
      provider: "Google",
    };

    // Construct SQL query with placeholders
    const sql =
      "INSERT INTO users (name, social_id, email, provider) VALUES (?, ?, ?, ?)";
    // Pass parameter values as an array
    const params = [
      userData.name,
      userData.social_id,
      userData.email,
      userData.provider,
    ];

    console.log(data, profile);
  } catch (error) {
    console.error("Error in Google Call Back :", error);
    throw error;
  }
};

module.exports = { googleLogin, googleCallBack };
