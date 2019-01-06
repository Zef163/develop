/**
 * Libraries
 */
import Axios from "axios";
import {createActions} from "redux-actions";

/**
 * Article actions
 */
export const {articles: {getAllArticles, getOneArticle}} = createActions({
    ARTICLES: {

        /**
         * Get articles list
         * @returns {AxiosPromise<any>} Articles list
         */
        GET_ALL_ARTICLES: () => Axios.get("/api/data.json"),

        /**
         *
         * @param {number} articleID - Article identification
         * @returns {{}}
         * @constructor
         */
        GET_ONE_ARTICLE: articleID => async () => {
            const requestData = await Axios.get("/api/data.json");
            return {
                articleID,
                requestData,
            };
        },
    },
});
