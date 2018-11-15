import React from "react";
import PropTypes from "prop-types";

import { Card, Button, CardBody, CardText, CardHeader } from "reactstrap";
import { FaTimesCircle } from "react-icons/fa";
import Moment from "react-moment";

const Post = props => {
  return (
    <Card className="mb-4 post-item">
      <CardHeader className={"d-flex justify-content-between"}>
        <div className={"d-flex align-items-center"}>{props.content.title}</div>
        <FaTimesCircle
          onClick={() => props.onDelete(props.content.id)}
          style={{ cursor: "pointer" }}
        />
      </CardHeader>
      <CardBody>
        <CardText>{props.content.text}</CardText>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Button size={"sm"} outline color={"secondary"}>
              Read
            </Button>
          </div>
          <small className="text-muted">
            Published:&nbsp;
            <Moment format={"DD.MM.YYYY HH:mm"}>
              {props.content.created_at}
            </Moment>
          </small>
        </div>
      </CardBody>
    </Card>
  );
};

Post.propTypes = {
  content: PropTypes.object,
  onDelete: PropTypes.func
};

export default Post;
