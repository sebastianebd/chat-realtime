import { describe, it, expect, beforeEach } from "vitest";
import { useChatStore } from "../../store/chatStore";
import type { ChatMessage } from "../../types/chat";

const mockMessage: ChatMessage = {
  id: "test-id-1",
  sender: "Pedro",
  avatar: "https://ui-avatars.com/api/?name=Pedro",
  text: "Hola",
  timestamp: 1710000000000,
};

describe("chatStore (Zustand)", () => {
  beforeEach(() => {
    localStorage.clear();
    useChatStore.setState({
      connected: false,
      messages: [],
      user: null,
    });
  });

  it("inicia con estado desconectado y sin mensajes", () => {
    const state = useChatStore.getState();
    expect(state.connected).toBe(false);
    expect(state.messages).toEqual([]);
    expect(state.user).toBeNull();
  });

  it("setConnected actualiza el estado de conexión", () => {
    useChatStore.getState().setConnected(true);
    expect(useChatStore.getState().connected).toBe(true);

    useChatStore.getState().setConnected(false);
    expect(useChatStore.getState().connected).toBe(false);
  });

  it("addMessage agrega un mensaje y lo persiste en localStorage", () => {
    useChatStore.getState().addMessage(mockMessage);

    const state = useChatStore.getState();
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0]).toEqual(mockMessage);

    const stored = JSON.parse(localStorage.getItem("chat_messages")!);
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe("test-id-1");
  });

  it("setUser guarda el usuario en el estado y en localStorage", () => {
    const user = { username: "Ana", avatar: "https://example.com/ana.png" };
    useChatStore.getState().setUser(user);

    expect(useChatStore.getState().user).toEqual(user);
    const stored = JSON.parse(localStorage.getItem("chat_user")!);
    expect(stored.username).toBe("Ana");
  });

  it("logout limpia usuario, mensajes, y localStorage", () => {
    useChatStore.getState().setUser({ username: "Pedro", avatar: "url" });
    useChatStore.getState().addMessage(mockMessage);

    useChatStore.getState().logout();

    const state = useChatStore.getState();
    expect(state.user).toBeNull();
    expect(state.messages).toEqual([]);
    expect(localStorage.getItem("chat_user")).toBeNull();
    expect(localStorage.getItem("chat_messages")).toBeNull();
  });

  it("setMessages reemplaza todos los mensajes y los persiste", () => {
    const msgs = [mockMessage, { ...mockMessage, id: "test-id-2", text: "Adiós" }];
    useChatStore.getState().setMessages(msgs);

    expect(useChatStore.getState().messages).toHaveLength(2);
    const stored = JSON.parse(localStorage.getItem("chat_messages")!);
    expect(stored).toHaveLength(2);
  });
});
