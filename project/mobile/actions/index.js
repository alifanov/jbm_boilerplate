export const POST_RESPONSE = "posts/RESPONSE";

const reqWrapper = async (...args) => {
  return dispatch => {
    // dispatch(showLoading());

    try {
      let response = await fetch(args[0], args[1] || {});
      // dispatch(hideLoading());
      console.log(response)
      let result = await response.json();
      dispatch(args[2](result));
    } catch (e) {
      // dispatch(hideLoading());
      console.error(e)
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
  let url = "http://ec2-176-34-133-231.eu-west-1.compute.amazonaws.com/api/posts/";
  return reqWrapper(url, {}, items => postsFetchDataSuccess(items));
};
