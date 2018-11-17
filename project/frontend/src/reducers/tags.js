import { TAGS_SUCCESS } from "../actions/tags";

const initialState = { tags: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case TAGS_SUCCESS:
      return { tags: action.payload };

    default:
      return state;
  }
};
