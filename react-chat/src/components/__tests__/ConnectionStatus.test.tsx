import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConnectionStatus } from "../../components/ConnectionStatus";
import { useChatStore } from "../../store/chatStore";

describe("ConnectionStatus", () => {
  it("muestra 🟢 Conectado cuando el socket está conectado", () => {
    useChatStore.setState({
      connected: true,
      user: { username: "Pedro", avatar: "https://example.com/avatar.png" },
    });

    render(<ConnectionStatus />);
    expect(screen.getByText(/🟢 Conectado/)).toBeInTheDocument();
  });

  it("muestra 🔴 Desconectado cuando el socket no está conectado", () => {
    useChatStore.setState({
      connected: false,
      user: { username: "Pedro", avatar: "https://example.com/avatar.png" },
    });

    render(<ConnectionStatus />);
    expect(screen.getByText(/🔴 Desconectado/)).toBeInTheDocument();
  });

  it("muestra el nombre del usuario cuando está logueado", () => {
    useChatStore.setState({
      connected: true,
      user: { username: "Ana", avatar: "https://example.com/avatar.png" },
    });

    render(<ConnectionStatus />);
    expect(screen.getByText("Ana")).toBeInTheDocument();
  });
});
