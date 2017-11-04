/**
 * Libraries
 */
import {Map, fromJS} from "immutable";

/**
 * User reducer
 * @param state
 * @param action
 * @returns Immutable.Map
 */
export default function reducer (state = new Map(), action) {
    switch (action.type) {
        case "GET_ALL_ARTICLES": {
            return fromJS(action.data);
        }
        case "GET_ONE_ARTICLE": {
            let haveArticle = state.filter(item => Number(item.get("id")) === Number(action.articleID));
            return haveArticle.size !== 0 ? state : state.push(fromJS(action.data));
        }
        case "CHANGE_USER_NAME": {
            state.map((article, index) => {
                if (Number(article.getIn(["author", "id"])) === Number(action.userID)) {
                    state = state.setIn([index, "author", "name"], action.name);
                }

                article.get("comments").map((comment, key) => {
                    if (Number(comment.getIn(["commenter", "id"])) === Number(action.userID)) {
                        state = state.setIn([index, "comments", key, "commenter", "name"], action.name);
                    }
                });
            });
            return state;
        }
        case "EDIT_COMMENT": {
            state.map((article, index) => {
                article.get("comments").map((comment, key) => {
                    if (Number(comment.get("id")) === Number(action.commentID)) {
                        state = state.setIn([index, "comments", key, "text"], action.text);
                    }
                });
            });
            return state;
        }
        default: {
            return state;
        }
    }
}
