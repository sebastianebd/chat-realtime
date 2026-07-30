import { create } from "zustand";
import type { ChatMessage, UserProfile } from "../types/chat";

export interface ChatState {
  connected: boolean;
  messages: ChatMessage[];
  user: UserProfile | null;
  setConnected: (status: boolean) => void;
  addMessage: (msg: ChatMessage) => void;
  setMessages: (msgs: ChatMessage[]) => void;
  setUser: (user: UserProfile) => void;
  logout: () => void;
}

const loadMessages = (): ChatMessage[] => {
  try {
    const stored = localStorage.getItem("chat_messages");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useChatStore = create<ChatState>((set) => ({
  connected: false,
  messages: loadMessages(),
  user: null,
  setConnected: (status) => set({ connected: status }),
  addMessage: (msg) =>
    set((state) => {
      const updated = [...state.messages, msg];
      localStorage.setItem("chat_messages", JSON.stringify(updated));
      return { messages: updated };
    }),
  setMessages: (msgs) => {
    localStorage.setItem("chat_messages", JSON.stringify(msgs));
    set({ messages: msgs });
  },
  setUser: (user) => {
    localStorage.setItem("chat_user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("chat_user");
    localStorage.removeItem("chat_messages");
    set({ user: null, messages: [] });
  },
}));

const storedUser = localStorage.getItem("chat_user");
if (storedUser) {
  try {
    useChatStore.getState().setUser(JSON.parse(storedUser));
  } catch (e) {
    console.error("Error al recuperar el usuario", e);
  }
}
