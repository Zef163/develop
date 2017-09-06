/**
 * Components
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "js/App";
import {BrowserRouter} from "react-router-dom";

/**
 * Styles
 */
import "./less/styles.less";

/**
 * Web application
 */
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
