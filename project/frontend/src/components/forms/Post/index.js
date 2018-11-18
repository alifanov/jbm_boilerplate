import "./form.css";

import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Form, FormGroup, Input, Label, Jumbotron } from "reactstrap";

import TagsInput from "../../TagsInput";

class PostForm extends Component {
  state = {
    title: "",
    text: "",
    show: false,
    tags: []
  };
  onTagDel(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  onTagAdd(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }
  render() {
    return (
      <Jumbotron className={this.state.show ? "" : "transparent p-0"}>
        <a href="#" onClick={() => this.setState({ show: !this.state.show })}>
          <h4>New post</h4>
        </a>
        <Form className={this.state.show ? "d-block" : "d-none"}>
          <FormGroup>
            <Label for="exampleTitle">Title</Label>
            <Input
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
              type="text"
              name="title"
              id="exampleTitle"
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
          <FormGroup>
            <TagsInput
              suggestions={[
                {
                  id: 1,
                  name: "python"
                },
                {
                  id: 2,
                  name: "react"
                },
                {
                  id: 3,
                  name: "redux"
                }
              ]}
              tags={this.state.tags}
              onAdd={this.onTagAdd.bind(this)}
              onDel={this.onTagDel.bind(this)}
            />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button
              color={"secondary"}
              size={"sm"}
              onClick={() => {
                this.props.onSubmit(
                  this.state.title,
                  this.state.text,
                  this.state.tags.map(t => t.id)
                );
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
