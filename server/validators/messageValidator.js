const config = require("../config");

function validateMessage(msg) {
  if (!msg || typeof msg !== "object") {
    return "El mensaje debe ser un objeto válido";
  }
  if (typeof msg.id !== "string" || msg.id.length === 0) {
    return "El campo 'id' es requerido y debe ser un string";
  }
  if (typeof msg.sender !== "string" || msg.sender.trim().length === 0) {
    return "El campo 'sender' es requerido y no puede estar vacío";
  }
  if (typeof msg.text !== "string" || msg.text.trim().length === 0) {
    return "El campo 'text' es requerido y no puede estar vacío";
  }
  if (msg.text.length > config.maxMessageLength) {
    return `El mensaje no puede exceder ${config.maxMessageLength} caracteres`;
  }
  if (typeof msg.timestamp !== "number") {
    return "El campo 'timestamp' es requerido y debe ser un número";
  }
  return null;
}

module.exports = { validateMessage };
