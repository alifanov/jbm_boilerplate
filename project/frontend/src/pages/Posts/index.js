import "./index.css";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import DateRangePicker from "react-bootstrap-daterangepicker";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

import { FaCalendar } from "react-icons/fa";

import Post from "../../components/post";
import PostForm from "../../components/forms/post";
import {
  getPosts,
  addPost,
  delPost,
  updatePostsFilter,
  setPostsSearchFilter
} from "../../actions/posts";
import { wsConnect } from "../../actions/websockets";
import { postsCounterSelector, postsSelector } from "../../selectors";

export class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.wsConnect();
  }

  render() {
    const { posts, postsCounter, filters } = this.props;
    const dpProps = {};
    if (filters.from) {
      dpProps.startDate = filters.from;
    }
    if (filters.from) {
      dpProps.endDate = filters.to;
    }
    return (
      <div>
        <PostForm
          onSubmit={(title, text, tags) =>
            this.props.addPost(title, text, tags)
          }
        />
        <div className={"d-flex flex-row mb-4 justify-content-between"}>
          <h4>Posts: {postsCounter}</h4>
          <InputGroup
            style={{
              width: "50%"
            }}
          >
            <InputGroupAddon addonType="prepend">&#x1F50D;</InputGroupAddon>
            <Input
              placeholder="search"
              onChange={e => this.props.setPostsSearchFilter(e.target.value)}
            />
          </InputGroup>
          <DateRangePicker
            opens={"left"}
            onApply={(e, p) => {
              this.props.updatePostsFilter(p.startDate, p.endDate);
            }}
            {...dpProps}
          >
            <Button>
              {filters.from &&
                filters.to && (
                  <span>
                    {filters.from.format("DD.MM.YYYY")} -{" "}
                    {filters.to.format("DD.MM.YYYY")}
                  </span>
                )}
              &nbsp;
              <FaCalendar />
            </Button>
          </DateRangePicker>
        </div>
        {posts.map((p, i) => (
          <Post key={i} onDelete={this.props.delPost} {...p} />
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
      delPost,
      updatePostsFilter,
      wsConnect,
      setPostsSearchFilter
    },
    dispatch
  );

const mapStateToProps = state => ({
  posts: postsSelector(state),
  postsCounter: postsCounterSelector(state),
  filters: {
    from: state.postsReducer.from,
    to: state.postsReducer.to,
    q: state.postsReducer.q
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
