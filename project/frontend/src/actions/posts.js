import { RSAA } from "redux-api-middleware";
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

const BASE_URL = "http://localhost:8000";

const preprocessFilters = (from, to, q) => {
  const _from = from && from.toISOString();
  const _to = to && to.toISOString();
  return { created_at__gte: _from, created_at__lte: _to, search: q };
};

export const getPosts = (from = null, to = null, q = null) => dispatch => {
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
};

export const delPost = id => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/posts/" + id + "/",
      method: "DELETE",
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [
        DEL_POST_REQUEST,
        {
          type: DEL_POST_SUCCESS,
          payload: (action, state, res) => {
            dispatch(getPosts());
          }
        },
        DEL_POST_FAILURE
      ]
    }
  });
};
export const addPost = (title, text) => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/posts/",
      method: "POST",
      body: JSON.stringify({ title, text }),
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [
        ADD_POST_REQUEST,
        {
          type: ADD_POST_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(json => {
              dispatch(getPosts());
              return json;
            });
          }
        },
        ADD_POST_FAILURE
      ]
    }
  });
};

export const setPostsSearchFilter = q => {
  return (dispatch, getState) => {
    dispatch({
      type: POST_SEARCH_FILTER_SET,
      q
    });
    const { from, to } = getState();
    dispatch(getPosts(from, to, q));
  };
};

export function updatePostsFilter(from, to) {
  return dispatch => {
    dispatch({
      type: POST_FROM_FILTER_SET,
      from
    });
    dispatch({
      type: POST_TO_FILTER_SET,
      to
    });
    dispatch(getPosts(from, to));
  };
}
