import {POST_RESPONSE} from '../actions/posts'

export function posts(state = [], action) {
    switch (action.type) {
        case POST_RESPONSE:
            return action.items;

        default:
            return state;
    }
}