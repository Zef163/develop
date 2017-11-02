/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {Button, Comment, Form} from "semantic-ui-react";
import Axios from "axios";

/**
 * Components
 */
import {CommentsItem} from "components/Comments";

export default class CommentsGroup extends React.Component {

    static propTypes = {
        "articleID": PropTypes.number,
        "comments": PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),
        "editForm": PropTypes.bool,
        "form": PropTypes.bool,
        "replyForm": PropTypes.bool
    };

    static defaultProps = {
        "articleID": 0,
        "comments": Object(),
        "editForm": false,
        "form": false,
        "replyForm": false
    };

    constructor (props) {
        super(props);

        this.onSubmitReplyForm = this.onSubmitReplyForm.bind(this);
    }

    /**
     * Function for send request from comments form
     */
    onSubmitReplyForm () {
        let {articleID} = this.props;

        Axios.post("/api/comment/create", {
            "articleID": articleID
        }).then(
            // Success
            (response) => {
                console.log(response);
            },
            // Error
            (error) => {
                console.error(error);
            }
        );
    }

    /**
     * Function for render comments form
     */
    renderForm () {
        let {form, articleID} = this.props;

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

    render () {
        let {comments, replyForm, editForm} = this.props;

        if (Object.keys(comments).length === 0) {
            return <p>Comments not found</p>;
        }

        return (
            <Comment.Group>
                {comments.map((item) => {
                    return (
                        <CommentsItem
                            data={item}
                            editForm={editForm}
                            key={`one-comment__${item.id}`}
                            replyForm={replyForm}
                        />
                    );
                })}

                {this.renderForm()}
            </Comment.Group>
        );
    }

}
