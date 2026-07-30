import { useChatStore } from "../store/chatStore";
import { Avatar } from "./Avatar";

export function ConnectionStatus() {
  const { connected, user, logout } = useChatStore();

  return (
    <div className="status-bar">
      <div className="status-indicator">
        Status: {connected ? "🟢 Conectado" : "🔴 Desconectado"}
      </div>
      {user && (
        <div className="user-info">
          <Avatar src={user.avatar} alt="avatar" size="sm" />
          <span className="username">{user.username}</span>
          <button onClick={logout} className="logout-btn" title="Cerrar sesión">
            Salir
          </button>
        </div>
      )}
    </div>
  );
}
