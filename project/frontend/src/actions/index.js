import { showLoading, hideLoading } from "react-redux-loading-bar";

export const POST_RESPONSE = "posts/RESPONSE";
export const POST_FROM_FILTER_SET = "posts/FROM_FILTER_SET";
export const POST_TO_FILTER_SET = "posts/TO_FILTER_SET";
export const POST_SEARCH_FILTER_SET = "posts/SEARCH_FILTER_SET";

export const TAG_RESPONSE = "tags/RESPONSE";

export function postsFetchDataSuccess(items) {
  return {
    type: POST_RESPONSE,
    items
  };
}

export const setPostsSearchFilter = q => {
  return (dispatch, getState) => {
    dispatch({
      type: POST_SEARCH_FILTER_SET,
      q
    });
    const filters = getState().postsFilters;
    dispatch(getPosts(filters.from, filters.to, q));
  };
};

export function updatePostsFilter(from, to) {
  return dispatch => {
    dispatch({
      type: POST_FROM_FILTER_SET,
      from
    });
    dispatch({
      type: POST_TO_FILTER_SET,
      to
    });
    dispatch(getPosts(from, to));
  };
}

export function tagsFetchDataSuccess(items) {
  return {
    type: TAG_RESPONSE,
    items
  };
}

const reqWrapper = (...args) => {
  return async dispatch => {
    dispatch(showLoading());

    try {
      const response = await fetch(args[0], args[1] || {});
      dispatch(hideLoading());
      console.log(response);
      const result =
        response.statusText === "OK" ? await response.json() : null;
      console.log(result);
      dispatch(args[2](result));
      console.log("end", args[2](result));
    } catch (e) {
      dispatch(hideLoading());
      console.error(e);
    }
  };
};

export const getPosts = (from = null, to = null, search = "") => {
  let url = `http://localhost:8000/api/posts/?created_at__gte=${
    from ? from.toISOString() : ""
  }&created_at__lte=${to ? to.toISOString() : ""}&search=${search}`;

  return reqWrapper(url, {}, result => postsFetchDataSuccess(result));
};

export const delPost = id => {
  let url = `http://localhost:8000/api/posts/${id}/`;
  return reqWrapper(
    url,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    },
    _ => getPosts()
  );
};

export const addPost = (title, text) => {
  let url = `http://localhost:8000/api/posts/`;
  return reqWrapper(
    url,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: title, text: text })
    },
    _ => getPosts()
  );
};

export const getTags = () => {
  let url = "http://localhost:8000/api/tags/";
  return reqWrapper(url, {}, res => tagsFetchDataSuccess(res));
};

export const delTag = id => {
  let url = `http://localhost:8000/api/tags/${id}/`;
  return reqWrapper(
    url,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    },
    _ => getTags()
  );
};

export const addTag = name => {
  let url = `http://localhost:8000/api/tags/`;
  return reqWrapper(
    url,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    },
    _ => getTags()
  );
};
