import { combineReducers } from "redux";

import { loadingBarReducer } from "react-redux-loading-bar";
import { reducer as notifReducer } from "redux-notifications";

import { posts, postsFilters } from "./posts";
import { tags } from "./tags";

export default combineReducers({
  posts,
  tags,
  postsFilters,
  notifs: notifReducer,
  loadingBar: loadingBarReducer
});
