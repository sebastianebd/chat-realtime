import { useState } from "react";
import { socketService } from "../services/socket";
import { useChatStore } from "../store/chatStore";
import { createMessage } from "../utils/messageFactory";

export function MessageInput() {
  const [text, setText] = useState("");
  const user = useChatStore((state) => state.user);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && user) {
      socketService.sendMessage(createMessage(text, user));
      setText("");
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="escribir mensaje..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <button type="submit" disabled={!text.trim()}>
        Enviar
      </button>
    </form>
  );
}
