import { useChat } from "./hooks/useChat";
import { useChatStore } from "./store/chatStore";
import { Login } from "./components/Login";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import "./index.css";

function App() {
  const user = useChatStore((state) => state.user);

  useChat();

  return (
    <>
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>

      {!user ? (
        <Login />
      ) : (
        <div className="outer-shell">
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
        </div>
      )}
    </>
  );
}

export default App;
