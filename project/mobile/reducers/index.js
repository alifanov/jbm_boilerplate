import { GET_POSTS_SUCCESS } from "../actions";

const initialState = {
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
