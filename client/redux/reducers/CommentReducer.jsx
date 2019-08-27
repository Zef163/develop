/**
 * Libraries
 */
import {handleActions} from "redux-actions";
import {ActionType} from 'redux-promise-middleware';

/**
 * Actions
 */
import {getAllComments, editComment} from "redux/actions/CommentsActions";
import {changeUserName} from "redux/actions/UserActions";

const defaultState = {
    items: [],
    isLoaded: false,
};

/**
 * Comment reducer
 */
export const CommentReducer = handleActions(
    {
        [`${getAllComments}_${ActionType.Fulfilled}`]: (store, {payload}) => {
            const comments = payload.data.reduce((commentsList, article) => [...commentsList, ...article.comments], []);
            return {
                items: comments,
                isLoaded: true,
            };
        },

        /**
         * Edit comment
         * @param state - State of reducer
         * @param {number} commentID - Comment identification
         * @param {string} text - New text of comment
         * @returns {{items: Array<>, isLoaded: boolean}}
         */
        [editComment]: (store, {payload: {commentID, text}}) => ({
            ...store,
            items: store.items.map(comment => ({
                ...comment,
                text: Number(comment.id) === Number(commentID) ? text : comment.text,
            })),
        }),

        /**
         * Change user name
         * @param state - State of reducer
         * @param {number} id - User identification
         * @param {string} name - New user name
         * @returns {{items: Array<>, isLoaded: boolean}}
         */
        [changeUserName]: (state, {payload: {id, name}}) => ({
            ...state,
            items: state.items.map(comment => ({
                ...comment,
                commenter: {
                    ...comment.commenter,
                    name: Number(comment.commenter.id) === Number(id) ? name : comment.commenter.name,
                },
            })),
        }),
    },
    defaultState,
);
