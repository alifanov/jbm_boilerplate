import React from "react";
import PostList from "./pages/Posts";
import TagList from "./pages/Tags";
import Header from "./components/Header";
import Footer from "./components/footer";
import LoadingBar from "react-redux-loading-bar";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./pages/Login";

import { Notifs } from "redux-notifications";
import "redux-notifications/lib/styles.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Header />
      <LoadingBar />
      <div className="container">
        <Route exact path="/login/" component={Login} />
        <Route exact path="/" component={() => <div>Home page</div>} />
        <PrivateRoute path={"/posts/"} component={PostList} />
        <PrivateRoute path={"/tags/"} component={TagList} />
      </div>
      <Footer />
      <Notifs />
    </div>
  </Router>
);

export default App;
