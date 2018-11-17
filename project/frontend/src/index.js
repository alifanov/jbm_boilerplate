import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import App from "./App";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-daterangepicker/daterangepicker.css";

import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

Moment.locale("en");
momentLocalizer();

const store = configureStore();

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
);
