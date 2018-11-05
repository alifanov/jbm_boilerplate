import React from "react";
import PropTypes from "prop-types";

import { Button, ButtonGroup } from "reactstrap";
import { FaTimes } from "react-icons/fa";

const Tag = props => {
  return (
    <ButtonGroup>
      <Button outline color="secondary">
        {props.name}
      </Button>
      <Button
        outline
        color="secondary"
        onClick={() => props.onDelete(props.id)}
      >
        <FaTimes />
      </Button>
    </ButtonGroup>
  );
};

Tag.propTypes = {
  name: PropTypes.string
};

export default Tag;
