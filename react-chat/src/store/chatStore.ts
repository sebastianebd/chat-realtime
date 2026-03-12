import { create } from "zustand";

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: number;
}

export interface UserProfile {
  username: string;
  avatar: string;
}

export interface ChatState {
  connected: boolean;
  messages: ChatMessage[];
  user: UserProfile | null;
  setConnected: (status: boolean) => void;
  addMessage: (msg: ChatMessage) => void;
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
