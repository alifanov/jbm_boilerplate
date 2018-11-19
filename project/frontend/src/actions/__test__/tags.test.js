import {
  GET_TAGS_SUCCESS,
  ADD_TAG_REQUEST,
  ADD_TAG_SUCCESS,
  DEL_TAG_SUCCESS,
  delTag,
  getTags,
  addTag,
  GET_TAGS_REQUEST,
  GET_TAGS_FAILURE,
  DEL_TAG_REQUEST
} from "../tags";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { apiMiddleware, RequestError } from "redux-api-middleware";
const mockStore = configureMockStore([thunk, apiMiddleware]);

describe(">>>ACTION --- Test async tags actions", () => {
  let store;
  const tagsData = JSON.stringify([1, 2, 3, 4]);
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

  it("+++ actionCreate getTags", async () => {
    fetch.mockResponse(tagsData, {
      status: 200,
      headers: { "content-type": "application/json" }
    });
    await store.dispatch(getTags());
    const expectedActions = [
      {
        type: GET_TAGS_REQUEST
      },
      {
        type: GET_TAGS_SUCCESS,
        payload: [1, 2, 3, 4]
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("+++ actionCreate getTags [with error]", async () => {
    fetch.mockRejectOnce(new RequestError("bad descriptor"));
    await store.dispatch(getTags());
    const expectedActions = [
      {
        type: GET_TAGS_REQUEST
      },
      {
        type: GET_TAGS_FAILURE,
        error: true,
        meta: undefined,
        payload: new RequestError("bad descriptor")
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("+++ actionCreate delTag", async () => {
    fetch.mockResponseOnce(null, { status: 204 }).mockResponseOnce(tagsData, {
      status: 200,
      headers: { "content-type": "application/json" }
    });
    await store.dispatch(delTag(1));
    const expectedActions = [
      {
        type: DEL_TAG_REQUEST
      },
      {
        type: DEL_TAG_SUCCESS
      },
      {
        type: GET_TAGS_REQUEST
      },
      {
        type: GET_TAGS_SUCCESS,
        payload: [1, 2, 3, 4]
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("+++ actionCreate addTag", async () => {
    fetch.mockResponseOnce("{}", { status: 201 }).mockResponseOnce(tagsData, {
      status: 200,
      headers: { "content-type": "application/json" }
    });
    await store.dispatch(addTag("new"));
    const expectedActions = [
      {
        type: ADD_TAG_REQUEST
      },
      {
        type: ADD_TAG_SUCCESS
      },
      {
        type: GET_TAGS_REQUEST
      },
      {
        type: GET_TAGS_SUCCESS,
        payload: [1, 2, 3, 4]
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
