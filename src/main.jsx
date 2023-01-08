import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import "normalize.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
// import * as serviceWorker from "./serviceWorker";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
