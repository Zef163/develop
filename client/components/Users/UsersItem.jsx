/**
 * Libraries
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Card, Image, Button, Form, Message} from "semantic-ui-react";

/**
 * Components
 */
import NoPhoto from "dist/img/no-photo.png";

/**
 * Users item component
 */
export class UsersItem extends Component {

    static propTypes = {
        info: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]),
        updateComments: PropTypes.func,
    };

    static defaultProps = {
        info: Object(),
    };

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
            loadingForm: false,
            successMessage: "",
            showForm: false,
            userName: props.info.name,
        };

        this.onShowForm = this.onShowForm.bind(this);
        this.onHideForm = this.onHideForm.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    /**
     * Function for open editing form
     */
    onShowForm() {
        this.setState({
            errorMessage: "",
            successMessage: "",
            showForm: true,
        });
    }

    /**
     * Function for close editing form
     */
    onHideForm() {
        this.setState({
            errorMessage: "",
            successMessage: "",
            showForm: false,
        });
    }

    /**
     * Function for send editing form
     */
    onSubmitForm() {
        const {updateComments} = this.props;
        const {userName} = this.state;

        // Function at error send request
        const errorFunc = error => {
            this.setState({
                errorMessage: error.message,
                loadingForm: false,
            });
        };

        // Function at success send request
        const successFunc = response => {
            if (response.success !== true) {
                errorFunc(Error("User not edited"));
                return;
            }

            // Update parent component
            updateComments(userName);

            this.setState({
                loadingForm: false,
                successMessage: "User is edited",
            });
            setTimeout(() => {
                this.onHideForm();
            }, 2000);
        };

        // Update parent component
        updateComments(userName);
        successFunc({
            success: true,
        });
    }

    /**
     * Function for render editing form
     */
    renderForm() {
        const {userName, showForm, loadingForm, errorMessage, successMessage} = this.state;
        const success = String(successMessage).length > 0;
        const error = String(errorMessage).length > 0;
        const loading = Boolean(loadingForm);

        if (showForm === false) {
            return "";
        }

        return (
            <Form error={error} loading={loading} onSubmit={this.onSubmitForm} success={success}>
                <Form.Input
                    defaultValue={userName}
                    hidden={success}
                    label="User name"
                    onChange={obj => {
                        this.setState({
                            userName: obj.target.value,
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
                    onClick={this.onHideForm}
                    size="mini"
                    type="button"
                />

                <Message error>
                    <Message.Header>Error</Message.Header>
                    <Message.Content>{errorMessage}</Message.Content>
                </Message>

                <Message success>
                    <Message.Header>Success</Message.Header>
                    <Message.Content>{successMessage}</Message.Content>
                </Message>
            </Form>
        );
    }

    render() {
        const {info} = this.props;
        const {showForm} = this.state;

        // Data not found
        if (Object.keys(info).length === 0) {
            return <div />;
        }

        return (
            <Card>
                <Image src={NoPhoto} />
                <Card.Content hidden={!showForm}>
                    {this.renderForm()}
                </Card.Content>
                <Card.Content hidden={showForm}>
                    <Card.Header>
                        {info.name}
                    </Card.Header>
                    <Card.Meta>
                        <span className="date">
                          Joined in 2015
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {info.name} is a musician living in Nashville.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra hidden={showForm}>
                    <Button
                        content="Edit user"
                        icon="edit"
                        labelPosition="left"
                        onClick={this.onShowForm}
                        size="mini"
                        type="button"
                    />
                </Card.Content>
            </Card>
        );
    }

}
