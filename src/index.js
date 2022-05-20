import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App.jsx";
import React from "react";
import "./index.css";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store/store";
import { Provider } from "react-redux";
const root = createRoot(document.getElementById("root"));
//Starting Mock Server
makeServer();
root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
