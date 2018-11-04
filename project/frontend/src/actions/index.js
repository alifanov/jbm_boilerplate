import { showLoading, hideLoading } from "react-redux-loading-bar";

export const POST_RESPONSE = "posts/RESPONSE";
export const POST_FROM_FILTER_SET = "posts/FROM_FILTER_SET";
export const POST_TO_FILTER_SET = "posts/TO_FILTER_SET";

export const TAG_RESPONSE = "tags/RESPONSE";

export function postsFetchDataSuccess(items) {
  return {
    type: POST_RESPONSE,
    items
  };
}

export function setPostsFilterFrom(from) {
  return {
    type: POST_FROM_FILTER_SET,
    from
  };
}

export function setPostsFilterTo(to) {
  return {
    type: POST_TO_FILTER_SET,
    to
  };
}

export function tagsFetchDataSuccess(items) {
  return {
    type: TAG_RESPONSE,
    items
  };
}

export const getPosts = (from = null, to = null) => {
  return dispatch => {
    dispatch(showLoading());

    fetch(
      `http://localhost:8000/api/posts?created_at__gte=${
        from ? from.toISOString() : ""
      }&created_at__lte=${to ? to.toISOString() : ""}`
    )
      .then(response => {
        dispatch(hideLoading());
        return response.json();
      })
      .then(items => dispatch(postsFetchDataSuccess(items)))
      .catch(error => {
        dispatch(hideLoading());
        alert(error);
      });
  };
};

export const getTags = () => {
  return dispatch => {
    dispatch(showLoading());
    fetch("http://localhost:8000/api/tag/")
      .then(response => {
        dispatch(hideLoading());
        return response.json();
      })
      .then(items => dispatch(tagsFetchDataSuccess(items)))
      .catch(error => {
        dispatch(hideLoading());
        alert(error);
      });
  };
};

export const addPost = (title, text) => {
  return dispatch => {
    dispatch(showLoading());
    fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: title, text: text })
    })
      .then(response => {
        dispatch(hideLoading());
        dispatch(getPosts());
        //TODO: add notification of success adding post
      })
      .catch(error => {
        dispatch(hideLoading());
        alert(error);
      });
  };
};
export const addTag = name => {
  return dispatch => {
    dispatch(showLoading());
    fetch("http://localhost:8000/api/tag/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
      .then(response => {
        dispatch(hideLoading());
        dispatch(getTags());
        //TODO: add notification of success adding tag
      })
      .catch(error => {
        dispatch(hideLoading());
        alert(error);
      });
  };
};
