/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {Header, Grid} from "semantic-ui-react";
import {connect} from "react-redux";
import Immutable from "immutable";

/**
 * Actions
 */
import * as UserActions from "redux/actions/UserActions";

/**
 * Components
 */
import {CommentsGroup} from "components/Comments";
import {UsersItem} from "components/Users";
import Error404 from "Error404";
import PageLoader from "PageLoader";

class Users extends React.Component {

    static propTypes = {
        "dispatch": PropTypes.func,
        "match": PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),
        "user": PropTypes.oneOfType([
            PropTypes.instanceOf(Immutable.Map),
            PropTypes.instanceOf(Immutable.List)
        ])
    };

    static defaultProps = {
        "dispatch": () => {
            return false;
        },
        "match": Object(),
        "user": new Immutable.Map()
    };

    constructor (props) {
        super(props);

        this.state = {
            "isLoading": true
        };

        this.onUpdateComments = this.onUpdateComments.bind(this);
    }

    componentWillMount () {
        let {dispatch} = this.props,
            userID = this.getUserID();

        dispatch(UserActions.getOneUser(userID))
            .then(() => {
                this.endLoading();
            })
            .catch((error) => {
                console.error(error);
                this.endLoading();
            });
    }

    /**
     * Change loading status is "Loaded"
     */
    endLoading () {
        this.setState({
            "isLoading": false
        });
    }

    /**
     * Function for update info from current page
     */
    onUpdateComments (newName = "") {
        let userID = this.getUserID();

        // Update user name
        this.props.dispatch(UserActions.changeUserName(userID, newName))
            .then()
            .catch((error) => {
                console.error(error);
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
        let userID = this.getUserID(),
            {user} = this.props,
            userInfo = user.getIn([`user_${userID}`, "userInfo"], Immutable.fromJS({})),
            comments = user.getIn([`user_${userID}`, "comments"], Immutable.fromJS({})),
            {isLoading} = this.state;

        if (userInfo.size === 0) {
            return isLoading ? <PageLoader show={isLoading} /> : <Error404 />;
        }

        return (
            <Grid columns="12">
                <Grid.Row>
                    <Grid.Column computer="12">
                        <Header as="h1">{userInfo.getIn(["name"], "")}</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer="4">
                        <UsersItem info={userInfo.toJS()} updateComments={this.onUpdateComments} />
                    </Grid.Column>
                    <Grid.Column computer="8">
                        <CommentsGroup comments={comments.toJS()} editForm />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
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
export default isTesting ? Users : connect(store => ({ user: store.user, comments: store.comments }))(Users);