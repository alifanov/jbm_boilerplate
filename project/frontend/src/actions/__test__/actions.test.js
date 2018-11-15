import {
  postsFetchDataSuccess,
  POST_RESPONSE,
  tagsFetchDataSuccess,
  TAG_RESPONSE,
  setPostsSearchFilter,
  updatePostsFilter,
  POST_FROM_FILTER_SET,
  POST_TO_FILTER_SET,
  POST_SEARCH_FILTER_SET,
  getPosts,
  getTags
} from "../../actions";

import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

describe(">>>A C T I O N --- Test simple actions", () => {
  it("+++ actionCreator postsFetchDataSuccess", () => {
    const items = postsFetchDataSuccess([1, 2, 3, 4]);
    expect(items).toEqual({ type: POST_RESPONSE, items: [1, 2, 3, 4] });
  });
  it("+++ actionCreator tagsFetchDataSuccess", () => {
    const items = tagsFetchDataSuccess([1, 2, 3, 4]);
    expect(items).toEqual({ type: TAG_RESPONSE, items: [1, 2, 3, 4] });
  });
});

describe(">>>ACTION --- Test async tags actions", () => {
  it("+++ actionCreate getTags", async () => {
    fetchMock.reset();
    fetchMock.get("*", [1, 2, 3, 4]);
    const store = mockStore({
      posts: []
    });
    await store.dispatch(getTags());
    expect(store.getActions()[2]).toEqual({
      type: TAG_RESPONSE,
      items: [1, 2, 3, 4]
    });
  });
});

describe(">>>A C T I O N --- Test async posts actions", () => {
  it("+++ actionCreator setPostsSearchFilter", async () => {
    const store = mockStore({
      postsFilters: { q: null }
    });
    await store.dispatch(setPostsSearchFilter("q"));
    expect(store.getActions()[0]).toEqual({
      type: POST_SEARCH_FILTER_SET,
      q: "q"
    });
  });
  it("+++ actionCreator updatePostsFilter [from]", async () => {
    const store = mockStore({
      postsFilters: { from: null, to: null }
    });
    const d = new Date();
    await store.dispatch(updatePostsFilter(d, null));
    expect(store.getActions()[0]).toEqual({
      type: POST_FROM_FILTER_SET,
      from: d
    });
    expect(store.getActions()[1]).toEqual({
      type: POST_TO_FILTER_SET,
      to: null
    });
  });
  it("+++ actionCreator updatePostsFilter [to]", async () => {
    const store = mockStore({
      postsFilters: { from: null, to: null }
    });
    const d = new Date();
    await store.dispatch(updatePostsFilter(null, d));
    expect(store.getActions()[0]).toEqual({
      type: POST_FROM_FILTER_SET,
      from: null
    });
    expect(store.getActions()[1]).toEqual({
      type: POST_TO_FILTER_SET,
      to: d
    });
  });
  it("+++ actionCreator getPosts", async () => {
    fetchMock.reset();
    fetchMock.get("*", [1, 2, 3, 4]);
    const store = mockStore({
      posts: []
    });
    await store.dispatch(getPosts());
    expect(store.getActions()[2]).toEqual({
      type: POST_RESPONSE,
      items: [1, 2, 3, 4]
    });
  });
});
