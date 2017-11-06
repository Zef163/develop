/**
 * Libraries
 */import React from "react";
import {Header} from "semantic-ui-react";
import {connect} from "react-redux";

/**
 * Actions
 */
import * as CommentsAction from "redux/actions/CommentsActions";

/**
 * Components
 */
import {CommentsGroup} from "components/Comments";
import Error404 from "Error404";
import PageLoader from "PageLoader";

class Comments extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            "isLoading": true
        };
    }

    componentWillMount () {
        let {comments, dispatch} = this.props;

        if (comments.size === 0) {
            dispatch(CommentsAction.getAllComments())
                .then(res => {
                    this.setState({
                        "isLoading": false
                    });
                })
                .catch(error => {
                    console.error(error);
                    this.setState({
                        "isLoading": false
                    });
                });
        }
    }

    render () {
        let {comments} = this.props,
            {isLoading} = this.state;

        if (comments.size === 0) {
            return isLoading ? <PageLoader show={isLoading} /> : <Error404 />;
        }

        return (
            <div>
                <Header as="h1">Comments</Header>
                <CommentsGroup comments={comments.toJS()} editForm />
            </div>
        );
    }

}

/**
 * Environment
 */
const isTesting = process.env.NODE_ENV === "test";

/**
 * Return component by environment
 */
export default isTesting ? Comments : connect(store => ({ comments: store.comments }))(Comments);
