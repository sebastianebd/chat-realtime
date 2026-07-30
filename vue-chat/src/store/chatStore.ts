import { defineStore } from "pinia";
import { ref } from "vue";
import type { ChatMessage, UserProfile } from "../types/chat";

const loadMessages = (): ChatMessage[] => {
  try {
    const stored = localStorage.getItem("chat_messages");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useChatStore = defineStore("chat", () => {
  const connected = ref(false);
  const messages = ref<ChatMessage[]>(loadMessages());
  const user = ref<UserProfile | null>(null);

  function setConnected(status: boolean) {
    connected.value = status;
  }

  function addMessage(msg: ChatMessage) {
    messages.value.push(msg);
    localStorage.setItem("chat_messages", JSON.stringify(messages.value));
  }

  function setMessages(msgs: ChatMessage[]) {
    messages.value = msgs;
    localStorage.setItem("chat_messages", JSON.stringify(msgs));
  }

  function setUser(newUser: UserProfile) {
    localStorage.setItem("chat_user", JSON.stringify(newUser));
    user.value = newUser;
  }

  function logout() {
    localStorage.removeItem("chat_user");
    localStorage.removeItem("chat_messages");
    user.value = null;
    messages.value = [];
  }

  const storedUser = localStorage.getItem("chat_user");
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
    } catch (e) {
      console.error("Error al recuperar el usuario", e);
    }
  }

  return {
    connected,
    messages,
    user,
    setConnected,
    addMessage,
    setMessages,
    setUser,
    logout,
  };
});
