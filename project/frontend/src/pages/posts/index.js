import "./index.css";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import DateRangePicker from "react-bootstrap-daterangepicker";
import { Button } from "reactstrap";
import { FaCalendar } from "react-icons/fa";

import Post from "../../components/post";
import PostForm from "../../components/forms/post";
import {
  getPosts,
  addPost,
  delPost,
  updatePostsFilter
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
    const dpProps = {};
    if (filters.from) {
      dpProps.startDate = filters.from;
    }
    if (filters.from) {
      dpProps.endDate = filters.to;
    }
    return (
      <div>
        <PostForm onSubmit={(title, text) => this.props.addPost(title, text)} />
        <div className={"d-flex flex-row mb-4 justify-content-between"}>
          <h4>Posts: {postsCounter}</h4>
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
          <Post key={i} content={p} onDelete={this.props.delPost} />
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
