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
    let key = `user_${action.userID}`;

    switch (action.type) {
        case "GET_ONE_USER": {
            if (state.has(key)) {
                return state;
            } else {
                return state.set(key, fromJS(action.data));
            }
        }
        case "CHANGE_USER_NAME": {
            // Change new name in comments
            state.getIn([key, "comments"]).map((comment, index) => {
                state = state.setIn([key, "comments", index, "commenter", "name"], action.name);
            });

            // Change new name in user info
            state = state.setIn([key, "userInfo", "name"], action.name);

            return state;
        }
        case "EDIT_COMMENT": {
            state.map((user, indexUser) => {
                user.get("comments").map((comment, indexComment) => {
                    if (Number(comment.get("id")) === Number(action.commentID)) {
                        state = state.setIn([indexUser, "comments", indexComment, "text"], action.text);
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
