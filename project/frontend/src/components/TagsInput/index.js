import React from "react";
import { RSAA, RequestError } from "redux-api-middleware";
import ReactTags from "react-tag-autocomplete";
import "./index.css";

export default props => {
  return (
    <ReactTags
      autofocus={false}
      autoresize={false}
      tags={props.tags}
      suggestions={props.suggestions}
      handleDelete={props.onDel}
      handleAddition={props.onAdd}
      allowNew={false}
    />
  );
};
