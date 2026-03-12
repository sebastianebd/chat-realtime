import { useEffect } from "react";
import { socketService } from "./services/socket";
import { useChatStore, type ChatMessage } from "./store/chatStore";
import { Login } from "./components/Login";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import "./index.css";

function App() {
  const { user, setConnected, addMessage } = useChatStore();

  useEffect(() => {
    if (!user) return;

    socketService.connect();
    const socket = socketService.socket;
    if (!socket) return;

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onMessage = (msg: ChatMessage) => addMessage(msg);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socketService.disconnect();
    };
  }, [user, setConnected, addMessage]);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="chat-app">
      <div className="chat-container">
        <header className="chat-header">
          <h1>Chat Realtime React</h1>
          <ConnectionStatus />
        </header>

        <main className="chat-main">
          <MessageList />
        </main>

        <footer className="chat-footer">
          <MessageInput />
        </footer>
      </div>
    </div>
  );
}

export default App;
