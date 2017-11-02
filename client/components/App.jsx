/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {Container} from "semantic-ui-react";

/**
 * Components
 */
import Footer from "Footer";
import Header from "Header";


export default class App extends React.Component {

    static propTypes = {
        "children": PropTypes.object,
        "dispatch": PropTypes.func.isRequired
    };

    render () {
        return (
            <div id="app-view">
                <Header />
                <Container className="app-content">
                    {this.props.children}
                </Container>
                <Footer />
            </div>
        );
    }

}
