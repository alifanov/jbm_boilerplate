import { RSAA, RequestError } from "redux-api-middleware";
import { objectToQuery } from "../utils";

import { REACT_APP_API_URL } from "react-native-dotenv";

export const GET_POSTS_REQUEST = "@@posts/GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "@@posts/GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "@@posts/GET_POSTS_FAILURE";

const BASE_URL = REACT_APP_API_URL;
console.log("API URL:", BASE_URL);

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
      headers: { "Content-Type": "application/json" },
      types: [GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE]
    }
  });
