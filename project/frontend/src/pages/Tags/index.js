import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { getTags, addTag, delTag } from "../../actions/tags";
import { wsConnect } from "../../actions/websockets";
import { tagsCounterSelector, tagsSelector } from "../../selectors";
import { bindActionCreators } from "redux";

import Tag from "../../components/tag";
import TagForm from "../../components/forms/tag";

export class TagList extends Component {
  componentDidMount() {
    this.props.getTags();
    this.props.wsConnect();
  }

  render() {
    const { tags, counter } = this.props;
    return (
      <div>
        <TagForm onSubmit={name => this.props.addTag(name)} />
        <div>
          <h4>Tags: {counter}</h4>
        </div>
        {tags
          .map((p, i) => <Tag key={i} onDelete={this.props.delTag} {...p} />)
          .reduce((prev, curr) => [prev, " ", curr], null)}
      </div>
    );
  }
}

TagList.propTypes = {
  tags: PropTypes.array
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTags,
      addTag,
      delTag,
      wsConnect
    },
    dispatch
  );

const mapStateToProps = state => ({
  tags: tagsSelector(state),
  tagsCounter: tagsCounterSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagList);
