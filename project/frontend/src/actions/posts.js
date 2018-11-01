import {showLoading, hideLoading} from 'react-redux-loading-bar';

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

export const addPost = (title, text) => {
    return dispatch => {
        dispatch(showLoading());
        fetch('http://localhost:8000/api/post/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, text: text})
        })
            .then((response) => {
                dispatch(hideLoading());
                dispatch(getPosts());
                //TODO: add notification of success adding post
            })
            .catch((error) => {
                dispatch(hideLoading());
                alert(error)
            });

    }
}