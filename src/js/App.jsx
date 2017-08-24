/**
 * Libraries
 */
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

/**
 * Components
 */
import Custom from './Custom.jsx';
import Error404 from './Error404.jsx';
import Footer from './Footer';
import Header from './Header';
import Main from './Main.jsx';

export default class App extends Component {
    render() {
        console.log(this.props);

        return (
            <div>
                <Header />
                <Container className="content">
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/test/" component={Custom} />
                        <Route path="*" exact component={Error404} />
                    </Switch>
                </Container>
                <Footer />
            </div>
        );
    }
}
