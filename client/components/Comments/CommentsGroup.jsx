/**
 * Libraries
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Comment, Form} from "semantic-ui-react";
import Axios from "axios";

/**
 * Components
 */
import {CommentsItemConnected} from "components/Comments";

/**
 * Comments group component
 */
export class CommentsGroup extends Component {

    static propTypes = {
        articleID: PropTypes.number,
        comments: PropTypes.array,
        editForm: PropTypes.bool,
        form: PropTypes.bool,
        replyForm: PropTypes.bool,
    };

    static defaultProps = {
        articleID: 0,
        comments: [],
        editForm: false,
        form: false,
        replyForm: false,
    };

    constructor(props) {
        super(props);

        this.onSubmitReplyForm = this.onSubmitReplyForm.bind(this);
    }

    /**
     * Function for send request from comments form
     */
    onSubmitReplyForm() {
        const {articleID} = this.props;

        Axios.post("/api/comment/create", {
            articleID,
        }).then(
            // Success
            response => {
                console.log(response);
            },
            // Error
            error => {
                console.error(error);
            }
        );
    }

    /**
     * Function for render comments form
     */
    renderForm() {
        const {form, articleID} = this.props;

        if (form === false || articleID === 0) {
            return "";
        }

        return (
            <Form onSubmit={this.onSubmitReplyForm} reply>
                <Form.TextArea />
                <Button content="Add comment" icon="add" labelPosition="left" primary />
            </Form>
        );
    }

    render() {
        const {comments, replyForm, editForm} = this.props;

        if (comments.length === 0) {
            return <p>Comments not found</p>;
        }

        return (
            <Comment.Group>
                {comments.map(item => (
                    <CommentsItemConnected
                        data={item}
                        editForm={editForm}
                        key={`one-comment__${item.id}`}
                        replyForm={replyForm}
                    />
                ))}

                {this.renderForm()}
            </Comment.Group>
        );
    }

}
