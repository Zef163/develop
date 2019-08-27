/**
 * Libraries
 */
import {handleActions} from "redux-actions";
import {ActionType} from 'redux-promise-middleware';

/**
 * Actions
 */
import {getOneUser, changeUserName} from 'redux/actions/UserActions';
import {editComment} from "redux/actions/CommentsActions";

const defaultState = {
    userInfo: {},
    comments: [],
    isLoaded: false,
};

/**
 * User reducer
 */
export const UserReducer = handleActions(
    {
        /**
         * Reset user reducer before getting user info
         * @returns {{userInfo: {}, comments: Array, isLoaded: boolean}}
         */
        [`${getOneUser}_${ActionType.Pending}`]: () => defaultState,

        /**
         * Get user info
         * @param state - State of reducer
         * @param {number} userID - User identification
         * @param requestData - Axios request data
         * @returns {{userInfo, comments: Array, isLoaded: boolean}}
         */
        [`${getOneUser}_${ActionType.Fulfilled}`]: (state, {payload: {userID, requestData}}) => {
            let comments = [];
            let userInfo = {};

            requestData.data.forEach(article => {
                // Search user info
                if (Object.keys(userInfo).length === 0 && Number(article?.author?.id) === Number(userID)) {
                    userInfo = article.author;
                }

                // Search user comments
                comments = article.comments.reduce((commentsList, comment) => {
                    if (Number(comment?.commenter?.id) === Number(userID)) {
                        return [...commentsList, comment];
                    } else {
                        return commentsList;
                    }
                }, comments);
            });

            return {
                userInfo,
                comments,
                isLoaded: true,
            };
        },

        /**
         * Change user name
         * @param state - State of reducer
         * @param {string} name - New user name
         * @returns {{userInfo, comments: Array, isLoaded: boolean}}
         */
        [changeUserName]: (state, {payload: {name}}) => ({
            ...state,
            userInfo: {
                ...state.userInfo,
                name,
            },
            comments: state.comments.map(comment => ({
                ...comment,
                commenter: {
                    ...comment.commenter,
                    name,
                },
            })),
        }),

        /**
         * Edit comment of article
         * @param state - State of reducer
         * @param {number} commentID - Comment identification
         * @param {string} text - New text of comment
         * @returns {{items: Array<>, isLoaded: boolean}}
         */
        [editComment]: (state, {payload: {commentID, text}}) => ({
            ...state,
            comments: state.comments.map(comment => ({
                ...comment,
                text: Number(comment.id) === Number(commentID) ? text : comment.text,
            })),
        }),
    },
    defaultState,
);
