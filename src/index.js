import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./AppContext";
import * as serviceWorker from "./serviceWorker";
const history = createBrowserHistory({});
ReactDOM.render(
  <BrowserRouter history={history}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
