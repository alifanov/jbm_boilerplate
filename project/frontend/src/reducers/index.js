import { combineReducers } from "redux";

import { loadingBarReducer } from "react-redux-loading-bar";
import { reducer as notifReducer } from "redux-notifications";

import postsReducer from "./posts";
import tagsReducer from "./tags";

export default combineReducers({
  postsReducer,
  tagsReducer,
  notifs: notifReducer,
  loadingBar: loadingBarReducer
});
