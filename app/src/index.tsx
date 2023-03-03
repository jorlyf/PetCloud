import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@redux/store";
import App from "./App";

import "./index.scss";

const element = document.getElementById("root");
if (!element) {
  throw new Error("root element not found");
}

const root = createRoot(element);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);