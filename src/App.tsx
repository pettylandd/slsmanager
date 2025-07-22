import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { PublishersPage } from './pages/PublishersPage';
import { LoginForm } from './components/LoginForm'; // <-- import your login form
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Main content: show login or app
const MainApp = () => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) return <LoginForm />;

  return (
    <div>
      <header className="d-flex justify-content-end align-items-center p-2 border-bottom">
        <span className="me-3">
          Welcome, <b>{user?.username}</b> ({user?.role})
        </span>
        <button className="btn btn-outline-secondary btn-sm" onClick={logout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </header>
      <SettingsProvider>
        <PublishersPage />
      </SettingsProvider>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
