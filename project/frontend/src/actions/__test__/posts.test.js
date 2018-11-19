import {
  GET_POSTS_SUCCESS,
  setPostsSearchFilter,
  updatePostsFilter,
  POST_FROM_FILTER_SET,
  POST_TO_FILTER_SET,
  POST_SEARCH_FILTER_SET,
  getPosts,
  addPost,
  delPost,
  GET_POSTS_REQUEST,
  DEL_POST_REQUEST,
  DEL_POST_SUCCESS,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS
} from "../posts";

// import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
const mockStore = configureMockStore([thunk, apiMiddleware]);

describe(">>>A C T I O N --- Test async posts actions", () => {
  let store;
  const postsData = JSON.stringify([1, 2, 3, 4]);
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      auth: {
        access: { token: "token" },
        refresh: {
          token: "token"
        },
        errors: {}
      }
    });
  });

  it("+++ actionCreator setPostsSearchFilter", async () => {
    fetch.mockResponseOnce(postsData, {
      status: 200,
      headers: { "content-type": "application/json" }
    });

    await store.dispatch(setPostsSearchFilter("q"));
    const expectedActions = [
      {
        type: POST_SEARCH_FILTER_SET,
        q: "q"
      },
      {
        type: GET_POSTS_REQUEST
      },
      {
        type: GET_POSTS_SUCCESS,
        payload: [1, 2, 3, 4]
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("+++ actionCreator updatePostsFilter [from]", async () => {
    fetch.mockResponseOnce(postsData, {
      status: 200,
      headers: { "content-type": "application/json" }
    });

    const d = new Date();
    await store.dispatch(updatePostsFilter(d, null));
    const expectedActions = [
      {
        type: POST_FROM_FILTER_SET,
        from: d
      },
      {
        type: POST_TO_FILTER_SET,
        to: null
      },
      {
        type: GET_POSTS_REQUEST
      },
      {
        type: GET_POSTS_SUCCESS,
        payload: [1, 2, 3, 4]
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("+++ actionCreator updatePostsFilter [to]", async () => {
    fetch.mockResponseOnce(postsData, {
      status: 200,
      headers: { "content-type": "application/json" }
    });

    const d = new Date();
    await store.dispatch(updatePostsFilter(null, d));
    const expectedActions = [
      {
        type: POST_FROM_FILTER_SET,
        from: null
      },
      {
        type: POST_TO_FILTER_SET,
        to: d
      },
      {
        type: GET_POSTS_REQUEST
      },
      {
        type: GET_POSTS_SUCCESS,
        payload: [1, 2, 3, 4]
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("+++ actionCreator getPosts", async () => {
    fetch.mockResponseOnce(postsData, {
      status: 200,
      headers: { "content-type": "application/json" }
    });

    await store.dispatch(getPosts());
    const expectedActions = [
      {
        type: GET_POSTS_REQUEST
      },
      {
        type: GET_POSTS_SUCCESS,
        payload: [1, 2, 3, 4]
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("+++ actionCreator delPost", async () => {
    fetch.mockResponseOnce(null, { stauts: 204 }).mockResponseOnce(postsData, {
      status: 200,
      headers: { "content-type": "application/json" }
    });

    await store.dispatch(delPost(1));
    const expectedActions = [
      { type: DEL_POST_REQUEST },
      { type: DEL_POST_SUCCESS },
      {
        type: GET_POSTS_REQUEST
      },
      {
        type: GET_POSTS_SUCCESS,
        payload: [1, 2, 3, 4]
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("+++ actionCreator addPost", async () => {
    fetch.mockResponseOnce(null, { status: 201 }).mockResponseOnce(postsData, {
      status: 200,
      headers: { "content-type": "application/json" }
    });

    await store.dispatch(addPost("title", "text", []));
    const expectedActions = [
      { type: ADD_POST_REQUEST },
      { type: ADD_POST_SUCCESS },
      {
        type: GET_POSTS_REQUEST
      },
      {
        type: GET_POSTS_SUCCESS,
        payload: [1, 2, 3, 4]
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
