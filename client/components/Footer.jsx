/**
 * Libraries
 */
import React from "react";
import {Container} from "semantic-ui-react";

export default class Footer extends React.Component {

    render () {
        return (
            <footer className="app-footer">
                <Container>
                    &copy; Andrey Rogachev (<a className="app-footer__link" href="mailto:vi163rus@gmail.com">vi163rus@gmail.com</a>), 2017
                </Container>
            </footer>
        );
    }

}
