import { useChatStore } from '../store/chatStore';

export function ConnectionStatus() {
  const { connected, user, logout } = useChatStore();

  return (
    <div className="status-bar">
      <div className="status-indicator">
        Status: {connected ? '🟢 Conectado' : '🔴 Desconectado'}
      </div>
      {user && (
        <div className="user-info">
          <img src={user.avatar} alt="avatar" className="avatar-small" />
          <span className="username">{user.username}</span>
          <button onClick={logout} className="logout-btn" title="Cerrar sesión">Salir</button>
        </div>
      )}
    </div>
  );
}
