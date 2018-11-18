import {
  GET_POSTS_SUCCESS,
  setPostsSearchFilter,
  updatePostsFilter,
  POST_FROM_FILTER_SET,
  POST_TO_FILTER_SET,
  POST_SEARCH_FILTER_SET,
  getPosts,
  addPost,
  delPost
} from "../posts";

import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

describe(">>>A C T I O N --- Test async posts actions", () => {
  let store;
  beforeEach(() => {
    fetchMock.reset();
    store = mockStore({
      posts: [],
      postsFilters: { from: null, to: null }
    });
  });

  it("+++ actionCreator setPostsSearchFilter", async () => {
    fetchMock.get("*", [1, 2, 3, 4]);

    await store.dispatch(setPostsSearchFilter("q"));

    expect(store.getActions()[0]).toEqual({
      type: POST_SEARCH_FILTER_SET,
      q: "q"
    });

    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    expect(store.getActions()[3]).toEqual({
      type: GET_POSTS_SUCCESS,
      payload: [1, 2, 3, 4]
    });
  });
  it("+++ actionCreator updatePostsFilter [from]", async () => {
    fetchMock.get("*", [1, 2, 3, 4]);
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

    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    expect(store.getActions()[4]).toEqual({
      type: GET_POSTS_SUCCESS,
      payload: [1, 2, 3, 4]
    });
  });
  it("+++ actionCreator updatePostsFilter [to]", async () => {
    fetchMock.get("*", [1, 2, 3, 4]);
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

    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    expect(store.getActions()[4]).toEqual({
      type: GET_POSTS_SUCCESS,
      payload: [1, 2, 3, 4]
    });
  });
  it("+++ actionCreator getPosts", async () => {
    fetchMock.get("*", [1, 2, 3, 4]);

    await store.dispatch(getPosts());

    expect(store.getActions()[2]).toEqual({
      type: GET_POSTS_SUCCESS,
      payload: [1, 2, 3, 4]
    });
  });

  it("+++ actionCreator delPost", async () => {
    fetchMock.deleteOnce("*", 204);
    fetchMock.getOnce("*", [1, 2, 3, 4]);

    await store.dispatch(delPost(1));

    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    expect(store.getActions()[4]).toEqual({
      type: GET_POSTS_SUCCESS,
      payload: [1, 2, 3, 4]
    });
  });

  it("+++ actionCreator addPost", async () => {
    fetchMock.postOnce("*", 201);
    fetchMock.getOnce("*", [1, 2, 3, 4]);

    await store.dispatch(addPost(1, 2));

    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    expect(store.getActions()[4]).toEqual({
      type: GET_POSTS_SUCCESS,
      payload: [1, 2, 3, 4]
    });
  });
});
