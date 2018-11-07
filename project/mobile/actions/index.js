export const POST_RESPONSE = "posts/RESPONSE";

const reqWrapper = (...args) => {
  return dispatch => {
    // dispatch(showLoading());

    fetch(args[0], args[1] || {})
      .then(response => {
        // dispatch(hideLoading());
        console.log(response);
        return response.json();
      })
      .then(result => dispatch(args[2](result)))
      .catch(error => {
        // dispatch(hideLoading());
        alert(error);
      });
  };
};

export const postsFetchDataSuccess = items => {
  return {
    type: POST_RESPONSE,
    items
  };
};

export const getPosts = () => {
  let url = "http://192.168.1.38:8000/api/posts/";
  return reqWrapper(url, {}, items => postsFetchDataSuccess(items));
};
