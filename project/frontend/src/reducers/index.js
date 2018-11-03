import { combineReducers } from "redux";

import { loadingBarReducer } from "react-redux-loading-bar";

import { posts, postsFilters } from "./posts";
import { tags } from "./tags";

export default combineReducers({
  posts,
  tags,
  postsFilters,
  loadingBar: loadingBarReducer
});
