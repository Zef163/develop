import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Container } from 'semantic-ui-react';

export default class Header extends Component {

    /**
     * Function for get menu elements
     */
    getMenuElements() {
        let defaultClassName = "app-header__link";
        let activeClassName = `${defaultClassName}--active`;

        return [
            {
                to: '/',
                exact: true,
                className: defaultClassName,
                activeClassName: activeClassName,
                dangerouslySetInnerHTML: {__html: "Main"}
            },
            {
                to: '/articles/',
                className: defaultClassName,
                activeClassName: activeClassName,
                dangerouslySetInnerHTML: {__html: "Articles"}
            }
        ];
    }

    /**
     * Function for render NavLink elements from menu elements
     */
    renderMenuElements() {
        return this.getMenuElements().map((params, key) => {
            return (
                <NavLink {...params} key={`menuItem__${key}`} />
            )
        })
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
