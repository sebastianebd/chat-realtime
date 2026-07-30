require("dotenv").config();

const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://localhost:5174")
    .split(",")
    .map((origin) => origin.trim()),
  maxHistory: parseInt(process.env.MAX_HISTORY || "50", 10),
  maxMessageLength: parseInt(process.env.MAX_MESSAGE_LENGTH || "500", 10),
};

module.exports = config;
