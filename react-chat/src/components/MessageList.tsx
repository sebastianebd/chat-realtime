import { useEffect, useRef } from "react";
import { useChatStore } from "../store/chatStore";
import { MessageItem } from "./MessageItem";
import { EmptyState } from "./EmptyState";

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
        <EmptyState message="No hay mensajes. Sé el primero en decir hola." />
      ) : (
        messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            isOwn={msg.sender === user?.username}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
