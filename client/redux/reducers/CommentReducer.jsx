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
        case "GET_ALL_COMMENTS": {
            return fromJS(action.data);
        }
        case "CHANGE_USER_NAME": {
            // Update author name
            state.map((comment, index) => {
                if (Number(comment.getIn(["commenter", "id"])) === Number(action.userID)) {
                    state = state.setIn([index, "commenter", "name"], action.name);
                }
            });
            return state;
        }
        case "EDIT_COMMENT": {
            state.map((comment, index) => {
                if (Number(comment.get("id")) === Number(action.commentID)) {
                    state = state.setIn([index, "text"], action.text);
                }
            });

            return state;
        }
        default: {
            return state;
        }
    }
}
