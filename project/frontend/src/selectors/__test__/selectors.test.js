import {
  postsSelector,
  tagsSelector,
  tagsCounterSelector,
  postsCounterSelector
} from "../index";

describe(">>>SELECTORS --- Test selectors", () => {
  it("selector - test postsSelector", () => {
    const state = { postsReducer: { posts: [1, 2, 3, 4] } };
    expect(postsSelector(state)).toEqual([1, 2, 3, 4]);
  });
  it("selector - test tagsSelector", () => {
    const state = { tagsReducer: { tags: [1, 2, 3, 4] } };
    expect(tagsSelector(state)).toEqual([1, 2, 3, 4]);
  });
  it("selector - test postsCounterSelector", () => {
    const state = { postsReducer: { posts: [1, 2, 3, 4] } };
    expect(postsCounterSelector(state)).toEqual(4);
  });
  it("selector - test tagsCounterSelector", () => {
    const state = { tagsReducer: { tags: [1, 2, 3, 4] } };
    expect(tagsCounterSelector(state)).toEqual(4);
  });
});
