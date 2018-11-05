import React from "react";

import { Link } from "react-router-dom";

const Header = props => {
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
        <a className="p-2 text-dark" href="#">
          Page #3
        </a>
        <a className="p-2 text-dark" href="#">
          Page #4
        </a>
      </nav>
      <a className="btn btn-outline-primary" href="#">
        Sign up
      </a>
    </div>
  );
};

export default Header;
