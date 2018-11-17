import {
  GET_POSTS_SUCCESS,
  POST_FROM_FILTER_SET,
  POST_TO_FILTER_SET,
  POST_SEARCH_FILTER_SET
} from "../actions/posts";

const initialState = {
  posts: [],
  from: null,
  to: null,
  q: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return { ...state, posts: action.payload };
    case POST_FROM_FILTER_SET:
      return { ...state, from: action.from };
    case POST_TO_FILTER_SET:
      return { ...state, to: action.to };
    case POST_SEARCH_FILTER_SET:
      return { ...state, q: action.q };
    default:
      return state;
  }
};
