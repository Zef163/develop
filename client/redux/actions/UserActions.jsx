/**
 * Libraries
 */
import Axios from "axios";

/**
 * ========================
 * === Static functions ===
 * ========================
 */

/**
 * Function for get user information
 */
function searchUserInfo (article, userID) {
    let userInfo = [];
    if (Object.prototype.hasOwnProperty.call(article, "author", "id")) {
        if (parseInt(article.author.id) === parseInt(userID)) {
            userInfo = article.author;
        }
    }
    return userInfo;
}

/**
 * Function for get user information
 */
function searchUserComments (article, userID, comments) {
    if (Object.prototype.hasOwnProperty.call(article, "comments")) {
        for (let comment of article.comments) {
            if (Object.prototype.hasOwnProperty.call(comment, "commenter", "id")) {
                if (parseInt(comment.commenter.id) === parseInt(userID)) {
                    comments.push(comment);
                }
            }
        }
    }
    return comments;
}

/**
 * Get info of one user
 */
export function getOneUser (userID) {
    return async dispatch => {
        try {
            const {data} = await Axios.get("/api/data.json");

            let comments = [],
                userInfo = [];

            for (let article of data) {
                // Search user info
                if (Object.keys(userInfo).length === 0) {
                    userInfo = searchUserInfo(article, userID);
                }

                // Search user comments
                comments = searchUserComments(article, userID, comments);
            }

            dispatch({
                "type": "GET_ONE_USER",
                "userID": userID,
                "data": {
                    "userInfo": userInfo,
                    "comments": comments
                }
            });

        } catch (error) {
            console.error(error);
        }
    };
}

export function changeUserName (userID = 0, userName = "") {
    return async dispatch => {
        try {
            dispatch({
                "type": "CHANGE_USER_NAME",
                "name": String(userName || ""),
                "userID": Number(userID || 0)
            });
        } catch (error) {
            console.error(error);
        }
    };
}
