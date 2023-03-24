import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@redux/store";
import App from "./App";

import "./index.scss";
import "./colorDefinition.scss";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";

const element = document.getElementById("root");
if (!element) {
  throw new Error("root element not found.");
}

const consoleError = console.error; // eslint-disable-line no-console
console.error = (...args) => { // eslint-disable-line no-console
  if (args && typeof args[0] === 'string' && args[0].indexOf('A non-serializable value was detected in') > -1) {
    // Ignore.
  } else {
    // Log the error as normally.
    consoleError.apply(console, args);
  }
};

const root = createRoot(element);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReactNotifications />
      <App />
    </BrowserRouter>
  </Provider>
);