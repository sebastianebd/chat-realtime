import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useChatStore } from "../../store/chatStore";
import type { ChatMessage } from "../../types/chat";

const mockMessage: ChatMessage = {
  id: "test-id-1",
  sender: "Pedro",
  avatar: "https://ui-avatars.com/api/?name=Pedro",
  text: "Hola",
  timestamp: 1710000000000,
};

describe("chatStore (Pinia)", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it("inicia con estado desconectado y sin mensajes", () => {
    const store = useChatStore();
    expect(store.connected).toBe(false);
    expect(store.messages).toEqual([]);
    expect(store.user).toBeNull();
  });

  it("setConnected actualiza el estado de conexión", () => {
    const store = useChatStore();
    store.setConnected(true);
    expect(store.connected).toBe(true);

    store.setConnected(false);
    expect(store.connected).toBe(false);
  });

  it("addMessage agrega un mensaje y lo persiste en localStorage", () => {
    const store = useChatStore();
    store.addMessage(mockMessage);

    expect(store.messages).toHaveLength(1);
    expect(store.messages[0]).toEqual(mockMessage);

    const stored = JSON.parse(localStorage.getItem("chat_messages")!);
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe("test-id-1");
  });

  it("setUser guarda el usuario en el estado y en localStorage", () => {
    const store = useChatStore();
    const user = { username: "Ana", avatar: "https://example.com/ana.png" };
    store.setUser(user);

    expect(store.user).toEqual(user);
    const stored = JSON.parse(localStorage.getItem("chat_user")!);
    expect(stored.username).toBe("Ana");
  });

  it("logout limpia usuario, mensajes, y localStorage", () => {
    const store = useChatStore();
    store.setUser({ username: "Pedro", avatar: "url" });
    store.addMessage(mockMessage);

    store.logout();

    expect(store.user).toBeNull();
    expect(store.messages).toEqual([]);
    expect(localStorage.getItem("chat_user")).toBeNull();
    expect(localStorage.getItem("chat_messages")).toBeNull();
  });

  it("setMessages reemplaza todos los mensajes y los persiste", () => {
    const store = useChatStore();
    const msgs = [mockMessage, { ...mockMessage, id: "test-id-2", text: "Adiós" }];
    store.setMessages(msgs);

    expect(store.messages).toHaveLength(2);
    const stored = JSON.parse(localStorage.getItem("chat_messages")!);
    expect(stored).toHaveLength(2);
  });
});
