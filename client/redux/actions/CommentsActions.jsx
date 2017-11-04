/**
 * Libraries
 */
import Axios from "axios";

/**
 * Get info of one user
 */
export function getAllComments () {
    return async dispatch => {
        try {
            const {data} = await Axios.get("/api/data.json");

            let comments = [];

            for (let article of data) {
                if (Object.prototype.hasOwnProperty.call(article, "comments")) {
                    for (let comment of article.comments) {
                        comments.push(comment);
                    }
                }
            }

            dispatch({
                "type": "GET_ALL_COMMENTS",
                "data": comments
            });

        } catch (error) {
            console.error(error);
        }
    };
}

export function editComment (commentID = 0, text = "") {
    return async dispatch => {
        try {
            dispatch({
                "type": "EDIT_COMMENT",
                "commentID": Number(commentID || 0),
                "text": String(text || "")
            });
        } catch (error) {
            console.error(error);
        }
    };
}
