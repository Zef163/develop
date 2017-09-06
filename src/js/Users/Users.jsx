/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {Header, Grid} from "semantic-ui-react";
import Axios from "axios";

/**
 * Components
 */
import {CommentsGroup} from "js/Comments";
import {UsersItem} from "js/Users";
import Error404 from "js/Error404";
import PageLoader from "js/PageLoader";

export default class Users extends React.Component {

    static propTypes = {
        "match": PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ])
    };

    static defaultProps = {
        "match": Object()
    };

    /**
     * Function for get user information
     */
    static searchUserInfo (article, userID) {
        let userInfo = [];
        if (Object.prototype.hasOwnProperty.call(article, "author", "id")) {
            if (parseInt(article.author.id) === userID) {
                userInfo = article.author;
            }
        }
        return userInfo;
    };

    /**
     * Function for get user comments
     */
    static searchUserComments (article, userID, comments) {
        if (Object.prototype.hasOwnProperty.call(article, "comments")) {
            for (let comment of article.comments) {
                if (Object.prototype.hasOwnProperty.call(comment, "commenter", "id")) {
                    if (parseInt(comment.commenter.id) === userID) {
                        comments.push(comment);
                    }
                }
            }
        }
        return comments;
    };

    constructor (props) {
        super(props);

        this.state = {
            "isLoading": true,
            "userInfo": [],
            "comments": []
        };

        this.onUpdateComments = this.onUpdateComments.bind(this);
    }

    componentDidMount () {
        Axios.get("/api/data.json")
            .then(
                // Success
                (response) => {
                    let {data} = response,
                        comments = [],
                        userID = this.getUserID(),
                        userInfo = [];

                    for (let article of data) {
                        // Search user info
                        if (Object.keys(userInfo).length === 0) {
                            userInfo = Users.searchUserInfo(article, userID);
                        }

                        // Search user comments
                        comments = Users.searchUserComments(article, userID, comments);
                    }

                    this.setState({
                        "isLoading": false,
                        "userInfo": userInfo,
                        "comments": comments
                    });
                },
                // Error
                (error) => {
                    console.error(error);
                }
            );
    }

    /**
     * Function for update info from current page
     */
    onUpdateComments (newName = "") {
        // <!-- Type here dispatch event --> //

        // console.log("newName is " + newName);

        // @todo: Remove this.setState after typing dispatch event
        this.setState((prevState) => {
            // Update name in comments
            for (let comment of prevState.comments) {
                comment.commenter.name = newName;
            }

            // Update name in user info
            prevState.userInfo.name = newName;

            // Set new state
            return prevState;
        });
    }

    /**
     * Function for get user identification number
     */
    getUserID () {
        let {params} = this.props.match,
            userID = 0;

        if (Object.prototype.hasOwnProperty.call(params, "id")) {
            userID = params.id;
        }

        return parseInt(userID);
    }

    render () {
        let {userInfo, comments, isLoading} = this.state;

        if (Object.keys(userInfo).length === 0) {
            if (isLoading) {
                return (
                    <PageLoader show={isLoading} />
                );
            }
            return (
                <Error404 />
            );
        }

        return (
            <Grid columns="12">
                <Grid.Row>
                    <Grid.Column computer="12">
                        <Header as="h1">{userInfo.name}</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer="4">
                        <UsersItem info={userInfo} updateComments={this.onUpdateComments} />
                    </Grid.Column>
                    <Grid.Column computer="8">
                        <CommentsGroup comments={comments} editForm />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

}
