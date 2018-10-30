import React from 'react';
import {Card, CardTitle, CardBody, CardText} from 'reactstrap';

const Post = (props) => {
    return (
        <Card>
            <CardBody>
                <CardTitle>{props.content.title}</CardTitle>
                <CardText>{props.content.text}</CardText>
            </CardBody>
        </Card>
    );
};

export default Post;
