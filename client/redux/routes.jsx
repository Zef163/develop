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
import {Articles, ArticlesOne} from "components/Articles";
import {Comments} from "components/Comments";
import {Users} from "components/Users";
import Error404 from "components/Error404";
import Main from "components/Main";

/**
 * Getting store
 */
@connect(store => ({ }))

export default class Routes extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <App {...this.props} history={History}>
                    <Switch>
                        {/* Main page */}
                        <Route component={Main} exact path="/" />

                        {/* Articles page */}
                        <Route component={Articles} exact path="/articles/" />
                        <Route component={ArticlesOne} path="/articles/view/:id/" />

                        {/* Comments page */}
                        <Route component={Comments} exact path="/comments/" />
                        <Route component={Comments} path="/comments/view/:id/" />

                        {/* Users page */}
                        <Route component={Users} path="/users/view/:id/" />

                        {/* Other pages */}
                        <Route component={Error404} exact path="*" />
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}