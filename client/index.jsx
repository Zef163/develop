/**
 * Libraries
 */
import React from "react";
import ReactDOM from "react-dom";
import Routes from "./redux/routes";
import {Provider} from "react-redux";
import store from "./redux/store";

/**
 * Styles
 */
import "./less/styles.less";

/**
 * Web application
 */
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById("root")
);
