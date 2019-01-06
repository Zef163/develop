/**
 * Libraries
 */
import React from "react";
import ReactDOM from "react-dom";
import {RoutesConnected} from "./redux/routes";
import {Provider} from "react-redux";
import Store from "./redux/store";

/**
 * Actions
 */
import * as CommentsActions from "redux/actions/CommentsActions";
import * as ArticleActions from "redux/actions/ArticleActions";

/**
 * Init applications
 */
Store.dispatch(CommentsActions.getAllComments());
Store.dispatch(ArticleActions.getAllArticles());

/**
 * Styles
 */
import "./less/styles.less";

/**
 * Web application
 */
ReactDOM.render(
    <Provider store={Store}>
        <RoutesConnected />
    </Provider>,
    document.getElementById("root")
);
