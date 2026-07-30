import type { ChatMessage, UserProfile } from "../types/chat";

export function createMessage(text: string, user: UserProfile): ChatMessage {
  return {
    id: crypto.randomUUID(),
    sender: user.username,
    avatar: user.avatar,
    text: text.trim(),
    timestamp: Date.now(),
  };
}
