import tagsReducer from "../tags";
import { GET_TAGS_SUCCESS } from "../../actions/tags";

describe(">>>R E D U C E R --- Test tagsReducers", () => {
  it("+++ reducer for " + GET_TAGS_SUCCESS, () => {
    let state = { tags: [] };
    state = tagsReducer(state, {
      type: GET_TAGS_SUCCESS,
      payload: [1, 2, 3, 4]
    });
    expect(state).toEqual({ tags: [1, 2, 3, 4] });
  });
  it("+++ reducer for UNKNOWN ACTION", () => {
    let state = { tags: [1] };
    state = tagsReducer(state, {
      type: "UNKNOWN ACTION",
      payload: [1, 2, 3, 4]
    });
    expect(state).toEqual({ tags: [1] });
  });
});
