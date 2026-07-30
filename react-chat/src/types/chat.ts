export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: number;
}

export interface UserProfile {
  username: string;
  avatar: string;
}

export interface ServerToClientEvents {
  message: (data: ChatMessage) => void;
  history: (data: ChatMessage[]) => void;
}

export interface ClientToServerEvents {
  message: (data: ChatMessage) => void;
}
