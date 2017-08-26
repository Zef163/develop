/**
 * Libraries
 */
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

/**
 * Components
 */
import Articles from './Articles';
import ArticlesOne from './ArticlesOne';
import Error404 from './Error404';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Container className="app-content">
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/articles/" exact component={Articles} />
                        <Route path="/articles/view/:id/" component={ArticlesOne} />
                        <Route path="*" exact component={Error404} />
                    </Switch>
                </Container>
                <Footer />
            </div>
        );
    }
}
