import { createSelector } from "reselect";

export const postsSelector = state => state.postsReducer.posts;
export const tagsSelector = state => state.tagsReducer.tags;

export const postsCounterSelector = createSelector(
  postsSelector,
  posts => posts.length
);

export const tagsCounterSelector = createSelector(
  tagsSelector,
  tags => tags.length
);
