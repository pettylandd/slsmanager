import React from "react";
import { useAuth } from "../context/AuthContext";

export const Protected: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <div style={{ margin: "2rem auto", maxWidth: 400 }}>
      <h2>Welcome, {user?.username}!</h2>
      <p>Your role: <b>{user?.role}</b></p>
      <button onClick={logout}>Logout</button>
      <hr />
      <div>
        {/* Add your protected content here */}
        <p>This content is only visible to logged-in users.</p>
      </div>
    </div>
  );
};
