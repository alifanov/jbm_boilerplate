import React from "react";
import PropTypes from "prop-types";

import "./footer.css";

const Footer = props => {
  return (
    <footer className="text-muted">
      <div className="container">
        <p className="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>Blog example</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
