const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config");
const { chatHandler } = require("./handlers/chatHandler");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.allowedOrigins,
    methods: ["GET", "POST"],
  },
});

const { messageHistory } = chatHandler(io);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    connections: io.engine.clientsCount,
    messagesInHistory: messageHistory.length,
  });
});

server.listen(config.port, () => {
  console.log(`Servidor escuchando en http://localhost:${config.port}`);
  console.log(`Origenes permitidos: ${config.allowedOrigins.join(", ")}`);
});
