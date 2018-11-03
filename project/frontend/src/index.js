import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-widgets/dist/css/react-widgets.css";

import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

Moment.locale("en");
momentLocalizer();

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
);
