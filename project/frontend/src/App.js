import React from "react";
import PostList from "./pages/posts";
import TagList from "./pages/tags";
import Header from "./components/header";
import Footer from "./components/footer";
import LoadingBar from "react-redux-loading-bar";

import { Notifs } from "redux-notifications";
import "redux-notifications/lib/styles.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Header />
      <LoadingBar />
      <div className="container">
        <Route exact={true} path={"/"} render={() => <div>Home page</div>} />
        <Route path={"/posts/"} component={PostList} />
        <Route path={"/tags/"} component={TagList} />
      </div>
      <Footer />
      <Notifs />
    </div>
  </Router>
);

export default App;
