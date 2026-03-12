import { useState } from "react";
import { useChatStore } from "../store/chatStore";

export function Login() {
  const [username, setUsername] = useState("");
  const setUser = useChatStore((state) => state.setUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;
      setUser({ username: username.trim(), avatar });
    }
  };

  return (
    <div className="login-container">
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
  );
}
