import { GET_TAGS_SUCCESS, delTag, getTags, addTag } from "../tags";

import mockConsole from "jest-mock-console";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
const mockStore = configureMockStore([thunk]);

describe(">>>ACTION --- Test async tags actions", () => {
  let store;
  beforeEach(() => {
    fetchMock.reset();
    store = mockStore({
      tags: []
    });
  });

  it("+++ actionCreate getTags", async () => {
    fetchMock.getOnce("*", [1, 2, 3, 4]);
    await store.dispatch(dispatch => ({
      type: GET_TAGS_SUCCESS,
      payload: [1, 2]
    }));
    console.log("Actions:", store.getActions());
    expect(store.getActions()[0]).toEqual({
      type: GET_TAGS_SUCCESS,
      payload: [1, 2, 3, 4]
    });
  });
  // it("+++ actionCreate getTags [with error]", async () => {
  //   fetchMock.reset();
  //   fetchMock.getOnce("*", 400);
  //   const originConsole = mockConsole();
  //   await store.dispatch(getTags());
  //   await new Promise(resolve => {
  //     setTimeout(resolve, 0);
  //   });
  //   expect(console.error).toHaveBeenCalled();
  //   originConsole();
  // });
  // it("+++ actionCreate delTag", async () => {
  //   fetchMock.deleteOnce("*", 204);
  //   fetchMock.getOnce("*", [1, 2, 3, 4]);
  //   await store.dispatch(delTag(1));
  //   await new Promise(resolve => {
  //     setTimeout(resolve, 0);
  //   });
  //   expect(store.getActions()[4]).toEqual({
  //     type: GET_TAGS_SUCCESS,
  //     payload: [1, 2, 3, 4]
  //   });
  // });
  // it("+++ actionCreate addTag", async () => {
  //   fetchMock.postOnce("*", 201);
  //   fetchMock.getOnce("*", [1, 2, 3, 4]);
  //   await store.dispatch(addTag("new"));
  //   await new Promise(resolve => {
  //     setTimeout(resolve, 0);
  //   });
  //   expect(store.getActions()[4]).toEqual({
  //     type: GET_TAGS_SUCCESS,
  //     payload: [1, 2, 3, 4]
  //   });
  // });
});
