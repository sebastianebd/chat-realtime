import { describe, it, expect } from "vitest";
import { createMessage } from "../../utils/messageFactory";
import type { UserProfile } from "../../types/chat";

const mockUser: UserProfile = {
  username: "Pedro",
  avatar: "https://ui-avatars.com/api/?name=Pedro",
};

describe("createMessage", () => {
  it("crea un mensaje con los campos del usuario", () => {
    const msg = createMessage("Hola mundo", mockUser);

    expect(msg.sender).toBe("Pedro");
    expect(msg.avatar).toBe(mockUser.avatar);
    expect(msg.text).toBe("Hola mundo");
  });

  it("genera un id único para cada mensaje", () => {
    const msg1 = createMessage("Mensaje 1", mockUser);
    const msg2 = createMessage("Mensaje 2", mockUser);

    expect(msg1.id).toBeDefined();
    expect(msg2.id).toBeDefined();
    expect(msg1.id).not.toBe(msg2.id);
  });

  it("incluye un timestamp numérico válido", () => {
    const before = Date.now();
    const msg = createMessage("Test", mockUser);
    const after = Date.now();

    expect(msg.timestamp).toBeGreaterThanOrEqual(before);
    expect(msg.timestamp).toBeLessThanOrEqual(after);
  });

  it("elimina espacios en blanco del texto", () => {
    const msg = createMessage("  Hola mundo  ", mockUser);
    expect(msg.text).toBe("Hola mundo");
  });
});
