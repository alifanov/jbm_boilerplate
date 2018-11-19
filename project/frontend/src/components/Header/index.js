import React from "react";
import { persistStore } from "redux-persist";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import * as reducers from "../../reducers";

export const Header = props => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto font-weight-normal">Simple blog</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link className={"p-2 text-dark"} to={"/posts/"}>
          Posts
        </Link>
        <Link className={"p-2 text-dark"} to={"/tags/"}>
          Tags
        </Link>
      </nav>
      {!props.isAuthenticated ? (
        <Link className="btn btn-outline-primary" to={"/login/"}>
          Login
        </Link>
      ) : (
        <Button
          color="primary"
          outline
          onClick={() => {
            persistStore(props).purge();
            window.location.href = "/";
          }}
        >
          Logout
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: reducers.isAuthenticated(state)
});
export default connect(
  mapStateToProps,
  null
)(Header);
