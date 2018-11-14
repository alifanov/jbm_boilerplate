import tagsReducer from "../tags";
import { TAG_RESPONSE } from "../../actions";

describe(">>>R E D U C E R --- Test tagsReducers", () => {
  it("+++ reducer for " + TAG_RESPONSE, () => {
    let state = { tags: [] };
    state = tagsReducer(state, { type: TAG_RESPONSE, items: [1, 2, 3, 4] });
    expect(state).toEqual({ tags: [1, 2, 3, 4] });
  });
});
