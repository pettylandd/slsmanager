import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) setError("Invalid username or password");
    else setError(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "2rem auto" }}>
      <h2>Login</h2>
      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
          required
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ marginTop: 10, color: "#888" }}>
        <b>Demo users:</b><br/>
        admin/admin123<br/>
        viewer/viewer123<br/>
        editor/editor123
      </div>
    </form>
  );
};
