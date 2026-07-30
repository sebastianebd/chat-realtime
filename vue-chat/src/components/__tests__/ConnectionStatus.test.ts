import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import ConnectionStatus from "../../components/ConnectionStatus.vue";
import { useChatStore } from "../../store/chatStore";

describe("ConnectionStatus.vue", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it("muestra 🟢 Conectado cuando el socket está conectado", () => {
    const store = useChatStore();
    store.setConnected(true);
    store.setUser({ username: "Pedro", avatar: "https://example.com/avatar.png" });

    const wrapper = mount(ConnectionStatus);
    expect(wrapper.text()).toContain("🟢 Conectado");
  });

  it("muestra 🔴 Desconectado cuando el socket no está conectado", () => {
    const store = useChatStore();
    store.setConnected(false);
    store.setUser({ username: "Pedro", avatar: "https://example.com/avatar.png" });

    const wrapper = mount(ConnectionStatus);
    expect(wrapper.text()).toContain("🔴 Desconectado");
  });

  it("muestra el nombre del usuario cuando está logueado", () => {
    const store = useChatStore();
    store.setConnected(true);
    store.setUser({ username: "Ana", avatar: "https://example.com/avatar.png" });

    const wrapper = mount(ConnectionStatus);
    expect(wrapper.text()).toContain("Ana");
  });
});
