import React from "react";

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

export default Footer;
