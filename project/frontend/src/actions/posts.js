import { RSAA, RequestError } from "redux-api-middleware";
import { withAuth } from "../reducers";
import { objectToQuery } from "../utils";

export const GET_POSTS_REQUEST = "@@posts/GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "@@posts/GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "@@posts/GET_POSTS_FAILURE";
export const DEL_POST_REQUEST = "@@posts/DEL_POST_REQUEST";
export const DEL_POST_SUCCESS = "@@posts/DEL_POST_SUCCESS";
export const DEL_POST_FAILURE = "@@posts/DEL_POST_FAILURE";
export const ADD_POST_REQUEST = "@@posts/ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "@@posts/ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "@@posts/ADD_POST_FAILURE";
export const POST_SEARCH_FILTER_SET = "@@posts/POST_SEARCH_FILTER_SET";
export const POST_FROM_FILTER_SET = "@@posts/POST_FROM_FILTER_SET";
export const POST_TO_FILTER_SET = "@@posts/POST_TO_FILTER_SET";

const BASE_URL = process.env.REACT_APP_API_URL;

const preprocessFilters = (from, to, q) => {
  const _from = from && from.toISOString();
  const _to = to && to.toISOString();
  return { created_at__gte: _from, created_at__lte: _to, search: q };
};

export const getPosts = (from = null, to = null, q = null) => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint:
        BASE_URL +
        "/api/posts/" +
        objectToQuery(preprocessFilters(from, to, q)),
      method: "GET",
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE]
    }
  });
export const delPost = id => async (dispatch, getState) => {
  const actionResponse = await dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/posts/" + id + "/",
      method: "DELETE",
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [DEL_POST_REQUEST, DEL_POST_SUCCESS, DEL_POST_FAILURE]
    }
  });
  if (actionResponse.error) {
    throw new RequestError(actionResponse.error);
  }
  return await dispatch(getPosts());
};
export const addPost = (title, text, tags) => async (dispatch, getState) => {
  const actionResponse = await dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/posts/",
      method: "POST",
      body: JSON.stringify({ title, text, tags }),
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE]
    }
  });
  if (actionResponse.error) {
    throw new RequestError(actionResponse.error);
  }
  return await dispatch(getPosts());
};

export const setPostsSearchFilter = q => (dispatch, getState) => {
  dispatch({
    type: POST_SEARCH_FILTER_SET,
    q
  });
  const { from, to } = getState();
  return dispatch(getPosts(from, to, q));
};

export const updatePostsFilter = (from, to) => dispatch => {
  dispatch({
    type: POST_FROM_FILTER_SET,
    from
  });
  dispatch({
    type: POST_TO_FILTER_SET,
    to
  });
  return dispatch(getPosts(from, to));
};
