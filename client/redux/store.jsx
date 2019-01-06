/**
 * Libraries
 */
import {createStore, applyMiddleware, compose} from "redux";
import promiseMiddleware from 'redux-promise-middleware';
import logger from "redux-logger";

/**
 * Application components
 */
import reducers from "./reducers/";

/**
 * Middleware
 */
let middleware = [
    promiseMiddleware({
        promiseTypeDelimiter: '_',
    }),
];

if (process.env.NODE_ENV === "development") {
    middleware.push(logger);

    /* setup of https://github.com/zalmoxisus/redux-devtools-extension */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    middleware = composeEnhancers(applyMiddleware(...middleware));
} else {
    middleware = applyMiddleware(...middleware);
}

const store = createStore(reducers, middleware);

export default store;
