import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Container>
                    &copy; Andrey Rogachev (<a href="mailto:vi163rus@gmail.com" className="footer__link">vi163rus@gmail.com</a>), 2017
                </Container>
            </footer>
        );
    }
}
