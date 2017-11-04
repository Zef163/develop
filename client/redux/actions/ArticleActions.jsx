/**
 * Libraries
 */
import Axios from "axios";

/**
 * Get info of one user
 */
export function getAllArticles () {
    return async dispatch => {
        try {
            const {data} = await Axios.get("/api/data.json");

            dispatch({
                "type": "GET_ALL_ARTICLES",
                "data": data
            });

        } catch (error) {
            console.error(error);
        }
    };
}

export function getOneArticles (articleID) {
    return async dispatch => {
        try {
            const {data} = await Axios.get("/api/data.json");

            let articles = data.filter((item) => {
                return parseInt(item.id) === parseInt(articleID);
            });

            dispatch({
                "type": "GET_ONE_ARTICLE",
                "articleID": articleID,
                "data": articles.shift()
            });
        } catch (error) {
            console.error(error);
        }
    };
}
