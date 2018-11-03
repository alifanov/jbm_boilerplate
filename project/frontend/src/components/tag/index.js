import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

const Tag = props => {
  return (
    <Button outline color="secondary">
      {props.name}
    </Button>
  );
};

Tag.propTypes = {
  name: PropTypes.string
};

export default Tag;
