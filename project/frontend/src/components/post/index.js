import React from "react";
import { Card, Button, CardBody, CardText, CardHeader } from "reactstrap";
import Moment from "react-moment";

const Post = props => {
  return (
    <Card className="mb-4 post-item">
      <CardHeader>{props.content.title}</CardHeader>
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

export default Post;
