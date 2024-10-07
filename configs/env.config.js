// env.config.js
const serverPort = process.env.SERVER_PORT || 1000;
const leonardoBaseUrl = process.env.LEONARDO_API_BASE_URL || "";
const leonardoApiKey = process.env.LEONARDO_API_KEY || "";

//export the configuration
module.exports = {
  serverPort,
  leonardoBaseUrl,
  leonardoApiKey,
};
