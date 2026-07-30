import type { ChatMessage } from "../types/chat";
import { formatTime } from "../utils/formatTime";
import { Avatar } from "./Avatar";

interface MessageItemProps {
  message: ChatMessage;
  isOwn: boolean;
}

export function MessageItem({ message, isOwn }: MessageItemProps) {
  return (
    <div
      className={`message-item ${isOwn ? "own-message" : "other-message"}`}
    >
      {!isOwn && (
        <Avatar src={message.avatar} alt={message.sender} />
      )}
      <div className="message-bubble">
        {!isOwn && <div className="message-sender">{message.sender}</div>}
        <div className="message-text">{message.text}</div>
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
}
