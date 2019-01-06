/**
 * Libraries
 */
import Axios from "axios";
import {createActions} from "redux-actions";

export const {comments: {getAllComments, editComment}} = createActions({
    COMMENTS: {
        /**
         * Get all comments
         * @returns {AxiosPromise<any>}
         */
        GET_ALL_COMMENTS: () => Axios.get("/api/data.json"),

        /**
         * Edit one comment
         * @param {number} commentID - Comment identification
         * @param {string} text - New text of comment
         * @returns {{commentID: number, text: string}}
         */
        EDIT_COMMENT: (commentID = 0, text = "") => ({commentID, text}),
    },
});
