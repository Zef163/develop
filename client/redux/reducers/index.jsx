/**
 * Libraries
 */
import {combineReducers} from "redux";

/**
 * Reducers
 */
import {UserReducer} from "./UserReducer";
import {CommentReducer} from "./CommentReducer";
import {ArticleReducer} from "./ArticleReducer";


export default combineReducers({
    user: UserReducer,
    comments: CommentReducer,
    articles: ArticleReducer,
});
