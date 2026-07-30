import { useEffect } from "react";
import { socketService } from "../services/socket";
import { useChatStore } from "../store/chatStore";
import type { ChatMessage } from "../types/chat";

export function useChat() {
  const { user, setConnected, addMessage, setMessages } = useChatStore();

  useEffect(() => {
    if (!user) return;

    socketService.connect();
    const socket = socketService.socket;
    if (!socket) return;

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onMessage = (msg: ChatMessage) => addMessage(msg);
    const onHistory = (msgs: ChatMessage[]) => setMessages(msgs);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("history", onHistory);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.off("history", onHistory);
      socketService.disconnect();
    };
  }, [user, setConnected, addMessage, setMessages]);
}
