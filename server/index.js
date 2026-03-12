const io = require("socket.io")(3001, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

console.log("Socket.io escuchando en el puerto 3001");
