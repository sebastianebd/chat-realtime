import { useEffect, useRef } from "react";
import { useChatStore } from "../store/chatStore";

export function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const user = useChatStore((state) => state.user);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list-container">
      {messages.length === 0 ? (
        <div className="empty-chat">
          No hay mensajes. Sé el primero en decir hola.
        </div>
      ) : (
        messages.map((msg) => {
          const isOwn = msg.sender === user?.username;
          return (
            <div
              key={msg.id}
              className={`message-item ${isOwn ? "own-message" : "other-message"}`}
            >
              {!isOwn && (
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="message-avatar"
                />
              )}
              <div className="message-bubble">
                {!isOwn && <div className="message-sender">{msg.sender}</div>}
                <div className="message-text">{msg.text}</div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
