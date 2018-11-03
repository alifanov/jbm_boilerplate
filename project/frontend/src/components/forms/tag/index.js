import "./form.css";

import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Form, FormGroup, Input, Label, Jumbotron } from "reactstrap";

class TagForm extends Component {
  state = {
    name: ""
  };

  render() {
    return (
      <Jumbotron>
        <h4>New tag</h4>
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              name="name"
              id="name"
              placeholder="Enter tag name"
            />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button
              color={"secondary"}
              size={"sm"}
              onClick={() => {
                this.props.onSubmit(this.state.name);
                this.setState({ name: "" });
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

TagForm.propTypes = {
  onSubmit: PropTypes.func
};

export default TagForm;
