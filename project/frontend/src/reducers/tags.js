import { TAG_RESPONSE } from "../actions/index";

export function tags(state = [], action) {
  switch (action.type) {
    case TAG_RESPONSE:
      return action.items;

    default:
      return state;
  }
}
