import { POST_RESPONSE } from "../actions";

const initialState = {
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_RESPONSE:
      return { ...state, posts: action.items };
    default:
      return state;
  }
};
