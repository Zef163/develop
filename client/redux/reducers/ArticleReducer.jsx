/**
 * Libraries
 */
import {handleActions} from "redux-actions";
import {ActionType} from 'redux-promise-middleware';

/**
 * Actions
 */
import {getAllArticles, getOneArticle} from "redux/actions/ArticleActions";
import {editComment} from "redux/actions/CommentsActions";
import {changeUserName} from "redux/actions/UserActions";

const defaultState = {
    items: [],
    isLoaded: false,
};

/**
 * Article reducer
 */
export const ArticleReducer = handleActions(
    {
        /**
         * Get all articles
         * @param state - State of reducer
         * @param payload - Payload data
         * @returns {{items: Array<>, isLoaded: boolean}}
         */
        [`${getAllArticles}_${ActionType.Fulfilled}`]: (state, {payload}) => ({
            items: payload.data,
            isLoaded: true,
        }),

        /**
         * Get one article
         * @param state - State of reducer
         * @param payload - Payload data
         * @returns {{items: Array<>, isLoaded: boolean}}
         */
        [`${getOneArticle}_${ActionType.Fulfilled}`]:  (state, {payload}) => {
            const haveArticle = state.items.some(item => Number(item.id) === Number(payload.articleID));
            const loadedData = payload.requestData.data.find(item => Number(item.id) === Number(payload.articleID));
            return haveArticle ? state : {...state, items: [...state.items, loadedData]};
        },

        /**
         * Edit comment of article
         * @param state - State of reducer
         * @param {number} commentID - Comment identification
         * @param {string} text - New text of comment
         * @returns {{items: Array<>, isLoaded: boolean}}
         */
        [editComment]: (state, {payload: {commentID, text}}) => ({
            ...state,
            items: state.items.map(article => ({
                ...article,
                comments: article.comments.map(comment => ({
                    ...comment,
                    text: Number(comment.id) === Number(commentID) ? text : comment.text,
                })),
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
            items: state.items.map(article => {
                const author = {
                    ...article.author,
                    name: Number(article.author.id) === Number(id) ? name : article.author.name,
                };

                const comments = article.comments.map(comment => ({
                    ...comment,
                    commenter: {
                        ...comment.commenter,
                        name: Number(comment.commenter.id) === Number(id) ? name : comment.commenter.name,
                    },
                }));

                return {
                    ...article,
                    author,
                    comments,
                };
            }),
        }),
    },
    defaultState,
);
