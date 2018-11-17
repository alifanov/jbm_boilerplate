import { RSAA } from "redux-api-middleware";
import { withAuth } from "../reducers";
export const TAGS_REQUEST = "@@tags/TAGS_REQUEST";
export const TAGS_SUCCESS = "@@tags/TAGS_SUCCESS";
export const TAGS_FAILURE = "@@tags/TAGS_FAILURE";
const BASE_URL = "http://localhost:8000";
export const getTags = () => ({
  [RSAA]: {
    endpoint: BASE_URL + "/api/tags/",
    method: "GET",
    // body: JSON.stringify({ message: message }),
    headers: withAuth({ "Content-Type": "application/json" }),
    types: [TAGS_REQUEST, TAGS_SUCCESS, TAGS_FAILURE]
  }
});
