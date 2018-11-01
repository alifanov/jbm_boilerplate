import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const POST_RESPONSE = 'posts/RESPONSE';

export function postsFetchDataSuccess(items) {
    return {
        type: POST_RESPONSE,
        items
    };
}

export const getPosts = () => {
    return dispatch => {
        dispatch(showLoading());
        fetch('http://localhost:8000/api/post/')
            .then((response) => {
                dispatch(hideLoading());
                return response.json()
            })
            .then((items) => dispatch(postsFetchDataSuccess(items)))
            .catch((error) => {
                dispatch(hideLoading());
                alert(error)
            });
    }
}
