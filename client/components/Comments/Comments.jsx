/**
 * Libraries
 */
import React, {Component} from "react";
import {Header} from "semantic-ui-react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

/**
 * Actions
 */
import {getAllComments as getAllCommentsAction} from "redux/actions/CommentsActions";

/**
 * Components
 */
import {CommentsGroup} from "components/Comments";
import {Error404} from "components/Error404";
import {PageLoader} from "components/PageLoader";

export class Comments extends Component {

    static propTypes = {
        isLoaded: PropTypes.bool,
        comments: PropTypes.array,
        getAllComments: PropTypes.func,
    };

    componentDidMount() {
        const {comments, getAllComments} = this.props;

        if (comments.length === 0) {
            getAllComments();
        }
    }

    render() {
        const {comments, isLoaded} = this.props;

        if (comments.length === 0) {
            return isLoaded ? <Error404 /> : <PageLoader show />;
        }

        return (
            <div>
                <Header as="h1">Comments</Header>
                <CommentsGroup comments={comments} editForm />
            </div>
        );
    }

}

/**
 * Fetch store data to props
 * @param store - Application store
 */
export const mapStateToProps = store => ({
    comments: store.comments.items,
    isLoaded: store.comments.isLoaded,
});

/**
 * Bind action creators
 */
export const mapDispatchToProps = {
    getAllComments: getAllCommentsAction,
};

/**
 * Connected component
 */
export const CommentsConnected = connect(mapStateToProps, mapDispatchToProps)(Comments);
