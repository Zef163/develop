/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {Dimmer, Loader} from "semantic-ui-react";

export default class PageLoader extends React.Component {

    static propTypes = {
        "show": PropTypes.bool
    };

    static defaultProps = {
        "show": false
    };

    render () {
        let {show} = this.props;

        return (
            <Dimmer active={show} inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        );
    }

}
