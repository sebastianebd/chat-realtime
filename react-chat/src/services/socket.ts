import { io, Socket } from "socket.io-client";
import type {
  ChatMessage,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../types/chat";

const URL = "http://localhost:3001";

class SocketService {
  public socket: Socket<ServerToClientEvents, ClientToServerEvents> | null =
    null;

  connect() {
    if (!this.socket) {
      this.socket = io(URL, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
    }
  }

  sendMessage(msg: ChatMessage) {
    this.socket?.emit("message", msg);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
