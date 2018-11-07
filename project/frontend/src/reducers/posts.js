import {
  POST_RESPONSE,
  POST_FROM_FILTER_SET,
  POST_TO_FILTER_SET,
  POST_SEARCH_FILTER_SET
} from "../actions/index";

export const posts = (state = [], action) => {
  switch (action.type) {
    case POST_RESPONSE:
      return action.items;

    default:
      return state;
  }
};

export const postsFilters = (state = { from: null, to: null }, action) => {
  switch (action.type) {
    case POST_FROM_FILTER_SET:
      return { from: action.from, to: state.to, q: state.q };
    case POST_TO_FILTER_SET:
      return { to: action.to, from: state.from, q: state.q };
    case POST_SEARCH_FILTER_SET:
      return { to: state.to, from: state.from, q: action.q };

    default:
      return state;
  }
};
