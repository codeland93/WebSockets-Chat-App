import { useState } from "react";
import Chat from "./components/Chat";
import "./App.css";
import './client';

const App = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username.trim()) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <div className="login">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <Chat username={username} />
        </div>
      )}
    </div>
  );
};

export default App;
