/**
 * Libraries
 */
import React from "react";
import {Container} from "semantic-ui-react";

/**
 * Footer component
 * @returns {Node} Rendered component
 * @constructor
 */
export const Footer = () => (
    <footer className="app-footer">
        <Container>
            &copy; Andrey Rogachev (<a className="app-footer__link" href="mailto:vi163rus@gmail.com">vi163rus@gmail.com</a>), 2019
        </Container>
    </footer>
);
