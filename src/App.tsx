import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome, {user && user.name}!</h2>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </header>
    </div>
  );
}

export default App;
