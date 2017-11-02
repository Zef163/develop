/**
 * Libraries
 */
import {combineReducers} from "redux";

/**
 * Reducers
 */
import user from "./UserReducer";

export default combineReducers({
    "user": user
});