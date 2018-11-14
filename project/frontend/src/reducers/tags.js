import { TAG_RESPONSE } from "../actions/index";

const initialState = { tags: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case TAG_RESPONSE:
      return { tags: action.items };

    default:
      return state;
  }
};
