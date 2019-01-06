/**
 * Libraries
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dimmer, Loader} from "semantic-ui-react";

export class PageLoader extends Component {

    static propTypes = {
        show: PropTypes.bool,
    };

    static defaultProps = {
        show: false,
    };

    render() {
        const {show} = this.props;

        return (
            <Dimmer active={show} inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        );
    }

}
