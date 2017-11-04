/**
 * Libraries
 */
import {combineReducers} from "redux";

/**
 * Reducers
 */
import user from "./UserReducer";
import comments from "./CommentReducer";
import articles from "./ArticleReducer";


export default combineReducers({
    "user": user,
    "comments": comments,
    "articles": articles
});
