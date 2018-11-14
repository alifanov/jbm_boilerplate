import postsReducer from "../posts";
import {
  POST_FROM_FILTER_SET,
  POST_RESPONSE,
  POST_SEARCH_FILTER_SET,
  POST_TO_FILTER_SET
} from "../../actions";

describe(">>>R E D U C E R --- Test postsReducers", () => {
  it("+++ reducer for UNKNOWN ACTION", () => {
    let state = { posts: [1] };
    state = postsReducer(state, {
      type: "UNKNOWN ACTION",
      items: [1, 2, 3, 4]
    });
    expect(state).toEqual({ posts: [1] });
  });

  it("+++ reducer for " + POST_RESPONSE, () => {
    let state = { posts: [] };
    state = postsReducer(state, { type: POST_RESPONSE, items: [1, 2, 3, 4] });
    expect(state).toEqual({ posts: [1, 2, 3, 4] });
  });

  it("+++ reducer for " + POST_SEARCH_FILTER_SET, () => {
    let state = { q: null };
    state = postsReducer(state, {
      type: POST_SEARCH_FILTER_SET,
      q: "create"
    });
    expect(state).toEqual({ q: "create" });
  });

  it("+++ reducer for " + POST_FROM_FILTER_SET, () => {
    let state = { from: null };
    state = postsReducer(state, {
      type: POST_FROM_FILTER_SET,
      from: "from"
    });
    expect(state).toEqual({ from: "from" });
  });

  it("+++ reducer for " + POST_TO_FILTER_SET, () => {
    let state = { to: null };
    state = postsReducer(state, {
      type: POST_TO_FILTER_SET,
      to: "to"
    });
    expect(state).toEqual({ to: "to" });
  });
});
