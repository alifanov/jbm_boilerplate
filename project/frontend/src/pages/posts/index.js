import "./index.css";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { DateTimePicker } from "react-widgets";

import Post from "../../components/post";
import PostForm from "../../components/forms/post";
import {
  getPosts,
  addPost,
  setPostsFilterFrom,
  setPostsFilterTo
} from "../../actions/index";
import { wsConnect } from "../../actions/websockets";
import { postsCounterSelector, postsSelector } from "../../selectors";

class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.wsConnect();
  }

  render() {
    const { posts, postsCounter, filters } = this.props;
    return (
      <div>
        <PostForm onSubmit={(title, text) => this.props.addPost(title, text)} />
        <div className={"row m-4"}>
          <div className="col-sm">
            <h4>Posts: {postsCounter}</h4>
          </div>
          <div className="col-sm">
            <DateTimePicker
              onChange={d => {
                this.props.setPostsFilterFrom(d);
              }}
              placeholder={"From"}
            />
          </div>
          <div className="col-sm">
            <DateTimePicker
              onChange={d => {
                this.props.setPostsFilterTo(d);
              }}
              placeholder={"To"}
            />
          </div>
        </div>
        {posts.map((p, i) => (
          <Post key={i} content={p} />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPosts,
      addPost,
      setPostsFilterFrom,
      setPostsFilterTo,
      wsConnect
    },
    dispatch
  );

const mapStateToProps = state => ({
  posts: postsSelector(state),
  postsCounter: postsCounterSelector(state),
  filters: state.postsFilters
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
