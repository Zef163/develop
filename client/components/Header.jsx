/**
 * Libraries
 */
import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Grid, Container} from "semantic-ui-react";

/**
 * Header component
 */
export class Header extends Component {

    /**
     * Function for get menu elements
     */
    getMenuElements = () => {
        const defaultClassName = "app-header__link";
        const activeClassName = `${defaultClassName}--active`;

        return [
            {
                to: "/",
                exact: true,
                className: defaultClassName,
                activeClassName,
                dangerouslySetInnerHTML: {
                    __html: "Main",
                },
                id: "main",
            },
            {
                to: "/articles/",
                className: defaultClassName,
                activeClassName,
                dangerouslySetInnerHTML: {
                    __html: "Articles",
                },
                id: "articles",
            },
            {
                to: "/comments/",
                className: defaultClassName,
                activeClassName,
                dangerouslySetInnerHTML: {
                    __html: "Comments",
                },
                id: "comments",
            },
        ];
    };

    /**
     * Function for render NavLink elements from menu elements
     */
    renderMenuElements() {
        return this.getMenuElements().map(params => (
            <NavLink {...params} key={`menuItem__${params.id}`} />
        ));
    }

    render() {
        return (
            <header className="app-header">
                <Container>
                    <Grid columns={12}>
                        <Grid.Column computer={4}>
                            <div className="app-header__logo">
                                Logo
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <div className="app-header__menu">
                                {this.renderMenuElements()}
                            </div>
                        </Grid.Column>
                    </Grid>
                </Container>
            </header>
        );
    }

}
