/**
 * Libraries
 */
import {createStore, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";

/**
 * Application components
 */
import reducers from "./reducers/";

/**
 * Middleware
 */
let middleware = [ReduxThunk];
if (process.env.NODE_ENV === "development") {
    middleware.push(logger());
}

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;
