import { createSelector } from "reselect";

export const postsSelector = state => state.posts;
export const tagsSelector = state => state.tags;

export const postsCounterSelector = createSelector(
  postsSelector,
  posts => posts.length
);

export const tagsCounterSelector = createSelector(
  tagsSelector,
  tags => tags.length
);
