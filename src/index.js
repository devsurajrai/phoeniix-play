import { render } from "react-dom";
import { App } from "./App";
import "./index.css";
import { makeServer } from "./server";
//Starting Mock Server
makeServer();
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
