/**
 * Libraries
 */
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

/**
 * Application components
 */
import reducers from "./reducers/index";
import promiseMiddleware from "lib/promiseMiddleware";
import immutifyState from "lib/immutifyState";

const initialState = immutifyState(window.__INITIAL_STATE__);

const store = applyMiddleware(thunkMiddleware, promiseMiddleware)(createStore)(reducers, initialState);

export default store;
