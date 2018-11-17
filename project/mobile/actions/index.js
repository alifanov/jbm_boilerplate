export const POST_RESPONSE = "posts/RESPONSE";

const reqWrapper = (...args) => {
  return async dispatch => {
    try {
      const response = await fetch(args[0], args[1] || {});
      const result = await response.json();
      dispatch(args[2](result));
    } catch (e) {
      console.error(e);
    }
  };
};

export const postsFetchDataSuccess = items => {
  return {
    type: POST_RESPONSE,
    items
  };
};

export const getPosts = () => {
  let url = process.env.REACT_APP_API_URL + "/api/posts/";
  return reqWrapper(url, {}, items => postsFetchDataSuccess(items));
};
