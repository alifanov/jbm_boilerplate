import { RSAA } from "redux-api-middleware";
import { withAuth } from "../reducers";
export const GET_TAGS_REQUEST = "@@tags/GET_TAGS_REQUEST";
export const GET_TAGS_SUCCESS = "@@tags/GET_TAGS_SUCCESS";
export const GET_TAGS_FAILURE = "@@tags/GET_TAGS_FAILURE";
export const DEL_TAG_REQUEST = "@@tags/DEL_TAG_REQUEST";
export const DEL_TAG_SUCCESS = "@@tags/DEL_TAG_SUCCESS";
export const DEL_TAG_FAILURE = "@@tags/DEL_TAG_FAILURE";
export const ADD_TAG_REQUEST = "@@tags/ADD_TAG_REQUEST";
export const ADD_TAG_SUCCESS = "@@tags/ADD_TAG_SUCCESS";
export const ADD_TAG_FAILURE = "@@tags/ADD_TAG_FAILURE";
const BASE_URL = "http://localhost:8000";
export const getTags = () => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/tags/",
      method: "GET",
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAILURE]
    }
  });
};
export const delTag = id => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/tags/" + id + "/",
      method: "DELETE",
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [
        DEL_TAG_REQUEST,
        {
          type: DEL_TAG_SUCCESS,
          payload: (action, state, res) => {
            dispatch(getTags());
          }
        },
        DEL_TAG_FAILURE
      ]
    }
  });
};
export const addTag = name => dispatch => {
  dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/tags/",
      method: "POST",
      body: JSON.stringify({ name }),
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [
        ADD_TAG_REQUEST,
        {
          type: ADD_TAG_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then(json => {
              dispatch(getTags());
              return json;
            });
          }
        },
        ADD_TAG_FAILURE
      ]
    }
  });
};
