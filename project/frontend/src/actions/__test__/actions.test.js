import {
  postsFetchDataSuccess,
  POST_RESPONSE,
  tagsFetchDataSuccess,
  TAG_RESPONSE,
  setPostsSearchFilter,
  POST_SEARCH_FILTER_SET
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

// describe(">>>A C T I O N --- Test async actions", () => {
//   it("+++ actionCreator setPostsSearchFilter", async () => {
//     fetchMock.get("*", [1, 2, 3, 4]);
//     const store = mockStore({
//       posts: [],
//       postsFilters: { from: null, to: null, q: null }
//     });
//     await store.dispatch(setPostsSearchFilter("q"));
//     expect(store.getActions()[0]).toEqual({
//       type: POST_SEARCH_FILTER_SET,
//       q: "q"
//     });
//     expect(store.getActions()).toEqual({
//       type: POST_RESPONSE,
//       items: [1, 2, 3, 4]
//     });
//   });
// });
