import { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { generateAvatarUrl } from "../utils/avatar";

export function Login() {
  const [username, setUsername] = useState("");
  const setUser = useChatStore((state) => state.setUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setUser({
        username: username.trim(),
        avatar: generateAvatarUrl(username.trim()),
      });
    }
  };

  return (
    <div className="outer-shell login-shell">
      <div className="login-container">
        <span className="login-header">Bienvenido</span>
        <h2>Ingresar al Chat</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Tu nombre..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
