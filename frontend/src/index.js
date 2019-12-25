import React from "react";
import { render } from "react-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
function renderApp() {
  const App = require("./App").default;
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
}

renderApp();

module.hot.accept(renderApp);
