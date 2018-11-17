import { combineReducers } from "redux";

import { loadingBarReducer } from "react-redux-loading-bar";
import { reducer as notifReducer } from "redux-notifications";
import auth, * as fromAuth from "./auth.js";

import postsReducer from "./posts";
import tagsReducer from "./tags";

export default combineReducers({
  auth,
  postsReducer,
  tagsReducer,
  notifs: notifReducer,
  loadingBar: loadingBarReducer
});

export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth);
export const accessToken = state => fromAuth.accessToken(state.auth);
export const isAccessTokenExpired = state =>
  fromAuth.isAccessTokenExpired(state.auth);
export const refreshToken = state => fromAuth.refreshToken(state.auth);
export const isRefreshTokenExpired = state =>
  fromAuth.isRefreshTokenExpired(state.auth);
export const authErrors = state => fromAuth.errors(state.auth);
export function withAuth(headers = {}) {
  return state => ({
    ...headers,
    Authorization: `Bearer ${accessToken(state)}`
  });
}
