import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { addTag, getTags } from "../../actions/index";
import { tagsCounterSelector, tagsSelector } from "../../selectors";
import { bindActionCreators } from "redux";

import Tag from "../../components/tag";
import TagForm from "../../components/forms/tag";

class TagList extends Component {
  componentDidMount() {
    this.props.getTags();
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
          .map((p, i) => <Tag key={i} {...p} />)
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
      getTags: getTags,
      addTag: addTag
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
