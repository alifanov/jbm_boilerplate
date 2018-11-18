import React from "react";
import ReactTags from "react-tag-autocomplete";
import "./index.css";

export default props => {
  return (
    <ReactTags
      tags={props.tags}
      suggestions={props.suggestions}
      handleDelete={props.onDel}
      handleAddition={props.onAdd}
      allowNew={false}
    />
  );
};
