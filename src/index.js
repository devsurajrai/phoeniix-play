import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App.jsx";
import React from "react";
import "./index.css";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
//Starting Mock Server
makeServer();
root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
