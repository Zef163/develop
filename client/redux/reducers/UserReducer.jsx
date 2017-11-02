/**
 * Libraries
 */
import {Map} from "immutable";

/**
 * User reducer
 * @param state
 * @param action
 * @returns Immutable.Map
 */
export default function userReducer (state = new Map(), action) {
    switch (action.type) {
        case "GET_ONE_USER": {
            console.log("GET_ONE_USER", state);
            return state.get(action.id);
        }
        case "EDIT_ONE_USER": {
            return state.set(action.id, action.text);
        }
        default: {
            return state;
        }
    }
}
