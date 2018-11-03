import {
  POST_RESPONSE,
  POST_FROM_FILTER_SET,
  POST_TO_FILTER_SET
} from "../actions/index";

export function posts(state = [], action) {
  switch (action.type) {
    case POST_RESPONSE:
      return action.items;

    default:
      return state;
  }
}

export function postsFilters(state = { from: null, to: null }, action) {
  switch (action.type) {
    case POST_FROM_FILTER_SET:
      return { from: action.from, to: state.to };
    case POST_TO_FILTER_SET:
      return { to: action.to, from: state.from };

    default:
      return state;
  }
}
