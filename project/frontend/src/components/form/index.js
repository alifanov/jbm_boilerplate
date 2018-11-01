import "./form.css";

import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Form, FormGroup, Input, Label, Jumbotron } from "reactstrap";

class PostForm extends Component {
  state = {
    title: "",
    text: ""
  };
  render() {
    return (
      <Jumbotron>
        <h4>New post</h4>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Enter post title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
              type="textarea"
              name="text"
              id="exampleText"
              placeholder={"Enter post text"}
            />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button
              color={"secondary"}
              size={"sm"}
              onClick={() => {
                this.props.onSubmit(this.state.title, this.state.text);
                this.setState({ title: "", text: "" });
              }}
            >
              Add new post
            </Button>
          </div>
        </Form>
      </Jumbotron>
    );
  }
}

PostForm.propTypes = {
  onSubmit: PropTypes.func
};

export default PostForm;
