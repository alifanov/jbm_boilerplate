export const POST_RESPONSE = 'posts/RESPONSE';

export function postsFetchDataSuccess(items) {
    return {
        type: POST_RESPONSE,
        items
    };
}

export const getPosts = () => {
    return dispatch => {
        fetch('http://localhost:8000/api/post/')
            .then((response) => response.json())
            .then((items) => dispatch(postsFetchDataSuccess(items)))
            .catch((error) => console.log(error));
    }
}
