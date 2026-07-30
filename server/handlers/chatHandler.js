const config = require("../config");
const { validateMessage } = require("../validators/messageValidator");

const messageHistory = [];

function chatHandler(io) {
  io.on("connection", (socket) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Usuario conectado: ${socket.id}`);

    socket.emit("history", messageHistory);

    socket.on("message", (msg) => {
      try {
        const error = validateMessage(msg);
        if (error) {
          console.error(`[Validación] ${error} — de socket ${socket.id}`);
          return;
        }

        messageHistory.push(msg);
        if (messageHistory.length > config.maxHistory) {
          messageHistory.shift();
        }

        io.emit("message", msg);
      } catch (err) {
        console.error(`[Error] al procesar mensaje de ${socket.id}:`, err);
      }
    });

    socket.on("disconnect", (reason) => {
      const ts = new Date().toISOString();
      console.log(`[${ts}] Usuario desconectado: ${socket.id} (${reason})`);
    });

    socket.on("error", (err) => {
      console.error(`[Error] Socket ${socket.id}:`, err);
    });
  });

  return { messageHistory }; // Opcionalmente expuesto por si se requiere en index.js
}

module.exports = { chatHandler };
