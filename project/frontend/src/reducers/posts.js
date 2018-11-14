import {
  POST_RESPONSE,
  POST_FROM_FILTER_SET,
  POST_TO_FILTER_SET,
  POST_SEARCH_FILTER_SET
} from "../actions/index";

const initialState = {
  posts: [],
  postsFilters: {
    from: null,
    to: null,
    q: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_RESPONSE:
      return { ...state, posts: action.items };
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
