import { RSAA, RequestError } from "redux-api-middleware";
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

const BASE_URL = process.env.REACT_APP_API_URL;

export const getTags = () => dispatch =>
  dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/tags/",
      method: "GET",
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAILURE]
    }
  });
export const delTag = id => async (dispatch, getState) => {
  const actionResponse = await dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/tags/" + id + "/",
      method: "DELETE",
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [DEL_TAG_REQUEST, DEL_TAG_SUCCESS, DEL_TAG_FAILURE]
    }
  });
  if (actionResponse.error) {
    throw new RequestError(actionResponse.error);
  }
  return await dispatch(getTags());
};
export const addTag = name => async (dispatch, getState) => {
  const actionResponse = await dispatch({
    [RSAA]: {
      endpoint: BASE_URL + "/api/tags/",
      method: "POST",
      body: JSON.stringify({ name }),
      headers: withAuth({ "Content-Type": "application/json" }),
      types: [ADD_TAG_REQUEST, ADD_TAG_SUCCESS, ADD_TAG_FAILURE]
    }
  });
  if (actionResponse.error) {
    throw new RequestError(actionResponse.error);
  }
  return await dispatch(getTags());
};
