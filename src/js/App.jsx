/**
 * Libraries
 */
import React from "react";
import {Route, Switch} from "react-router-dom";
import {Container} from "semantic-ui-react";

/**
 * Components
 */
import {Articles, ArticlesOne} from "js/Articles";
import {Comments} from "js/Comments";
import {Users} from "js/Users";
import Error404 from "js/Error404";
import Footer from "js/Footer";
import Header from "js/Header";
import Main from "js/Main";


export default class App extends React.Component {

    render () {
        return (
            <div>
                <Header />
                <Container className="app-content">
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
                </Container>
                <Footer />
            </div>
        );
    }

}
