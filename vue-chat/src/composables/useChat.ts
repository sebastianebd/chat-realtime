import { watch, onUnmounted } from "vue";
import { socketService } from "../services/socket";
import { useChatStore } from "../store/chatStore";
import type { ChatMessage } from "../types/chat";

export function useChat() {
  const chatStore = useChatStore();

  const onConnect = () => chatStore.setConnected(true);
  const onDisconnect = () => chatStore.setConnected(false);
  const onMessage = (msg: ChatMessage) => chatStore.addMessage(msg);
  const onHistory = (msgs: ChatMessage[]) => chatStore.setMessages(msgs);

  const initSocket = () => {
    socketService.connect();
    const socket = socketService.socket;
    if (!socket) return;

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("history", onHistory);
  };

  const cleanupSocket = () => {
    const socket = socketService.socket;
    if (socket) {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.off("history", onHistory);
    }
    socketService.disconnect();
  };

  watch(
    () => chatStore.user,
    (newUser, oldUser) => {
      if (newUser && !oldUser) {
        initSocket();
      } else if (!newUser && oldUser) {
        cleanupSocket();
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    cleanupSocket();
  });
}
