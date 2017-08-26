import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

const propTypes = {
    'show': PropTypes.bool
};

const defaultProps = {
    'show': false
};

export default class PageLoader extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        let { show } = this.props;

        return (
            <Dimmer active={show} inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        )
    }
}
