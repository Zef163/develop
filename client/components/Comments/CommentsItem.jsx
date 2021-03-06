/**
 * Libraries
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Axios from "axios";
import {Button, Comment, Form, Message} from "semantic-ui-react";
import {connect} from "react-redux";

/**
 * Actions
 */
import {editComment as editCommentAction} from "redux/actions/CommentsActions";

/**
 * Components
 */
import NoPhoto from "dist/img/no-photo.png";

/**
 * Comment item component
 */
export class CommentsItem extends Component {

    static propTypes = {
        articleID: PropTypes.number,
        data: PropTypes.object,
        editForm: PropTypes.bool,
        replyForm: PropTypes.bool,
        editComment: PropTypes.func,
    };

    static defaultProps = {
        articleID: 0,
        data: Object(),
        editForm: false,
        replyForm: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            // Replying form
            replyText: "",
            showReplyForm: false,
            loadingReplyForm: false,
            errorReplyMessage: "",
            successReplyMessage: "",

            // Editing form
            editText: props.data.text || "",
            showEditForm: false,
            loadingEditForm: false,
            errorEditMessage: "",
            successEditMessage: "",
        };

        // Replying form
        this.onOpenReply = this.onOpenReply.bind(this);
        this.onCloseReply = this.onCloseReply.bind(this);
        this.onSubmitReplyForm = this.onSubmitReplyForm.bind(this);

        // Editing form
        this.onOpenEdit = this.onOpenEdit.bind(this);
        this.onCloseEdit = this.onCloseEdit.bind(this);
        this.onSubmitEditForm = this.onSubmitEditForm.bind(this);
    }

    /**
     * Function for open reply form
     */
    onOpenReply() {
        this.setState({
            errorReplyMessage: "",
            showReplyForm: true,
            successReplyMessage: "",
        });
    }

    /**
     * Function for close reply form
     */
    onCloseReply() {
        this.setState({
            errorReplyMessage: "",
            showReplyForm: false,
            successReplyMessage: "",
        });
    }

    /**
     * Function for send request from comments reply form
     */
    onSubmitReplyForm() {
        const {replyText} = this.state;

        // Hide notification messages and show loader
        this.setState({
            errorReplyMessage: "",
            loadingReplyForm: true,
            successReplyMessage: "",
        });

        // Function at error send request
        const errorFunc = error => {
            this.setState({
                errorReplyMessage: error.message,
                loadingReplyForm: false,
            });
        };

        // Function at success send request

        const successFunc = response => {
            if (response.success !== true) {
                errorFunc(Error("Message not sent"));
                return;
            }
            this.setState({
                loadingReplyForm: false,
                successReplyMessage: "Message is sent",
            });
            setTimeout(() => {
                this.onCloseReply();
            }, 2000);
        };

        // Send POST request
        Axios.post("/api/comments/", {
            text: replyText,
            user_id: 0,
        }).then(successFunc, errorFunc);
    }

    /**
     * Function for open editing form
     */
    onOpenEdit() {
        this.setState({
            errorEditMessage: "",
            showEditForm: true,
            successEditMessage: "",
        });
    }

    /**
     * Function for open editing form
     */
    onCloseEdit() {
        this.setState({
            errorEditMessage: "",
            showEditForm: false,
            successEditMessage: "",
        });
    }

    /**
     * Function for send request from comments edit form
     */
    onSubmitEditForm() {
        const {data, editComment} = this.props;


        const {editText} = this.state;

        // Hide notification messages and show loader
        this.setState({
            errorEditMessage: "",
            loadingEditForm: true,
            successEditMessage: "",
        });

        editComment(data.id, editText);
        this.setState({
            loadingEditForm: false,
            successEditMessage: "Message is sent",
        });
        setTimeout(() => {
            this.onCloseEdit();
        }, 2000);

        // TODO: Add Error handler
        // this.setState({
        //     errorEditMessage: error.message,
        //     loadingEditForm: false,
        // });
    }

    /**
     * Function for render replying form
     */
    renderReplyingForm() {
        const {replyForm} = this.props;
        const {showReplyForm, loadingReplyForm, errorReplyMessage, successReplyMessage} = this.state;
        const success = String(successReplyMessage).length > 0;
        const error = String(errorReplyMessage).length > 0;
        const loading = Boolean(loadingReplyForm);

        if (replyForm === false || showReplyForm === false) {
            return "";
        }

        return (
            <Form error={error} loading={loading} onSubmit={this.onSubmitReplyForm} reply success={success}>
                <Form.TextArea
                    hidden={success}
                    label="Reply"
                    onChange={obj => {
                        this.setState({
                            replyText: obj.target.value,
                        });
                    }}
                />
                <Button
                    content="Add Reply"
                    hidden={success}
                    icon="reply"
                    labelPosition="left"
                    primary
                    size="mini"
                />
                <Button
                    color="red"
                    content="Cancel"
                    hidden={success}
                    icon="cancel"
                    labelPosition="left"
                    onClick={this.onCloseReply}
                    size="mini"
                />

                <Message error>
                    <Message.Header>Error</Message.Header>
                    <Message.Content>{errorReplyMessage}</Message.Content>
                </Message>

                <Message success>
                    <Message.Header>Success</Message.Header>
                    <Message.Content>{successReplyMessage}</Message.Content>
                </Message>
            </Form>
        );
    }

    /**
     * Function for render editing form
     */
    renderEditingForm() {
        const {editForm} = this.props;
        const {editText, showEditForm, loadingEditForm, errorEditMessage, successEditMessage} = this.state;
        const success = String(successEditMessage).length > 0;
        const error = String(errorEditMessage).length > 0;
        const loading = Boolean(loadingEditForm);

        if (editForm === false || showEditForm === false) {
            return null;
        }

        return (
            <Form error={error} loading={loading} onSubmit={this.onSubmitEditForm} success={success}>
                <Form.TextArea
                    defaultValue={editText}
                    hidden={success}
                    onChange={obj => {
                        this.setState({
                            editText: obj.target.value,
                        });
                    }}
                />
                <Button
                    content="Edit"
                    icon="edit"
                    labelPosition="left"
                    primary
                    size="mini"
                />
                <Button
                    color="red"
                    content="Cancel"
                    icon="cancel"
                    labelPosition="left"
                    onClick={this.onCloseEdit}
                    size="mini"
                    type="button"
                />

                <Message error>
                    <Message.Header>Error</Message.Header>
                    <Message.Content>{errorEditMessage}</Message.Content>
                </Message>

                <Message success>
                    <Message.Header>Success</Message.Header>
                    <Message.Content>{successEditMessage}</Message.Content>
                </Message>
            </Form>
        );
    }

    /**
     * Function for render comment actions block
     */
    renderCommentActions() {
        const {replyForm, editForm} = this.props;
        const {showReplyForm, showEditForm} = this.state;
        const hidden = showReplyForm || showEditForm;
        const actions = [];

        if (replyForm) {
            actions.push(
                <Comment.Action key="comment__action--reply" onClick={this.onOpenReply}>
                    Reply
                </Comment.Action>
            );
        }

        if (editForm) {
            actions.push(
                <Comment.Action key="comment__action--edit" onClick={this.onOpenEdit}>
                    Edit
                </Comment.Action>
            );
        }

        return (
            <Comment.Actions hidden={hidden}>
                {actions}
            </Comment.Actions>
        );
    }

    render() {
        const {data} = this.props;
        const {showEditForm} = this.state;

        // Data not found
        if (Object.keys(data).length === 0) {
            return <div />;
        }

        return (
            <Comment key={`one-comment__${data.id}`}>
                <Comment.Avatar src={NoPhoto} />
                <Comment.Content>
                    <Link className="author" to={`/users/view/${data.commenter.id}/`}>{data.commenter.name}</Link>
                    <Comment.Metadata>
                        <div>Yesterday at 12:30AM</div>
                    </Comment.Metadata>
                    <Comment.Text hidden={showEditForm}>{data.text}</Comment.Text>
                    {this.renderEditingForm()}
                    {this.renderCommentActions()}
                    {this.renderReplyingForm()}
                </Comment.Content>
            </Comment>
        );
    }

}

/**
 * Bind action creators
 */
export const mapDispatchToProps = {
    editComment: editCommentAction,
};

/**
 * Connected component
 */
export const CommentsItemConnected = connect(null, mapDispatchToProps)(CommentsItem);
