import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../src/index.css";
import AuthProvider from "./context/AuthContext";
import SettingProvider from "./context/SettingContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SettingProvider>
        <App />
      </SettingProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
