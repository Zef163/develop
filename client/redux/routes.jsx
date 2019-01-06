/**
 * Hot fix for Internet Explorer 8+
 */
import "babel-polyfill";

/**
 * Libraries
 */
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import History from "./history";

/**
 * Components
 */
import App from "components/App";
import {ArticlesConnected, ArticlesOneConnected} from "components/Articles";
import {CommentsConnected} from "components/Comments";
import {UsersConnected} from "components/Users";
import {Error404} from "components/Error404";
import {Main} from "components/Main";

/**
 * Routes component
 */
export const Routes = props => (
    <BrowserRouter>
        <App {...props} history={History}>
            <Switch>
                {/* Main page */}
                <Route component={Main} exact path="/" />

                {/* Articles page */}
                <Route component={ArticlesConnected} exact path="/articles/" />
                <Route component={ArticlesOneConnected} path="/articles/view/:id/" />

                {/* Comments page */}
                <Route component={CommentsConnected} exact path="/comments/" />
                <Route component={CommentsConnected} path="/comments/view/:id/" />

                {/* Users page */}
                <Route component={UsersConnected} path="/users/view/:id/" />

                {/* Other pages */}
                <Route component={Error404} exact path="*" />
            </Switch>
        </App>
    </BrowserRouter>
);

/**
 * Connected component
 */
export const RoutesConnected = connect()(Routes);
