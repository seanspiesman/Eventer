import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import ReduxToaster from "react-redux-toastr";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ScrollToTop from "./app/common/util/ScrollToTop";

const store = configureStore();

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToaster
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept("./app/App.jsx", () => {
    setTimeout(render);
  });
}

store.firebaseAuthIsReady.then(() => {
  render();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
