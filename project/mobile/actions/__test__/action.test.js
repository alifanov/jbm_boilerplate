import fetchMock from "fetch-mock";
import mockConsole from "jest-mock-console";

import { POST_RESPONSE, postsFetchDataSuccess, getPosts } from "../../actions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

describe(">>>A C T I O N --- Test simple actions", () => {
  it("+++ actionCreator postsFetchDataSuccess", () => {
    const posts = postsFetchDataSuccess([1, 2, 3, 4]);
    expect(posts).toEqual({ type: POST_RESPONSE, items: [1, 2, 3, 4] });
  });
});

describe(">>>A C T I O N --- Test async actions", () => {
  it("+++ actionCreator getPosts", async () => {
    fetchMock.getOnce("*", [1, 2, 3, 4]);
    const store = mockStore({
      posts: []
    });
    await store.dispatch(getPosts());
    expect(store.getActions()[0]).toEqual({
      type: POST_RESPONSE,
      items: [1, 2, 3, 4]
    });
  });
  it("+++ actionCreator getPosts [error]", async () => {
    fetchMock.reset();
    fetchMock.getOnce("*", 400, "Bad descriptior");
    const originConsole = mockConsole();
    const store = mockStore({
      posts: []
    });
    await store.dispatch(getPosts());
    expect(console.error).toHaveBeenCalled();
    originConsole();
  });
});
