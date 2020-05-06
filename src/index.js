import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";

let render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

if (module.hot) {
  module.hot.accept("./app/layout/App.jsx", () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
