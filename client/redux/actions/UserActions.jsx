/**
 * Libraries
 */
import Axios from "axios";
import {createActions} from "redux-actions";

/**
 * User actions
 */
export const {user: {getOneUser, changeUserName}} = createActions({
    USER: {
        /**
         * Get user info by user identification
         * @param {number} userID - User identification
         * @returns {Promise<{userID: number, requestData: any}>}
         */
        GET_ONE_USER: async userID => {
            const requestData = await Axios.get("/api/data.json");
            return {
                userID,
                requestData,
            };
        },

        /**
         * Change user name
         * @param id
         * @param name
         * @returns {{id: number, name: string}}
         * @constructor
         */
        CHANGE_USER_NAME: (id = 0, name = "") => ({id, name}),
    },
});
