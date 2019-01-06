/**
 * Libraries
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Header, Grid} from "semantic-ui-react";
import {connect} from "react-redux";

/**
 * Actions
 */
import {getOneUser as getOneUserAction, changeUserName as changeUserNameAction} from "redux/actions/UserActions";

/**
 * Components
 */
import {CommentsGroup} from "components/Comments";
import {UsersItem} from "components/Users";
import {Error404} from "components/Error404";
import {PageLoader} from "components/PageLoader";

export class Users extends Component {

    static propTypes = {
        match: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]),
        userInfo: PropTypes.object,
        comments: PropTypes.array,
        isLoaded: PropTypes.bool,
        getOneUser: PropTypes.func,
        changeUserName: PropTypes.func,
    };

    static defaultProps = {
        match: Object(),
    };

    constructor(props) {
        super(props);

        this.onUpdateComments = this.onUpdateComments.bind(this);
    }

    componentDidMount() {
        const {getOneUser} = this.props;
        const userID = this.getUserID();

        getOneUser(userID);
        this.endLoading();
    }

    /**
     * Change loading status is "Loaded"
     */
    endLoading() {
        this.setState({
            isLoading: false,
        });
    }

    /**
     * Function for update info from current page
     */
    onUpdateComments(newName = "") {
        const {changeUserName} = this.props;
        const userID = this.getUserID();

        // Update user name
        changeUserName(userID, newName);
    }

    /**
     * Function for get user identification number
     */
    getUserID() {
        const {params} = this.props.match;
        return Number(params.id || 0);
    }

    render() {
        const {userInfo, comments, isLoaded} = this.props;

        if (Object.keys(userInfo).length === 0) {
            return isLoaded ? <Error404 /> : <PageLoader show />;
        }

        return (
            <Grid columns="12">
                <Grid.Row>
                    <Grid.Column computer="12">
                        <Header as="h1">{userInfo.name || ''}</Header>
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

/**
 * Fetch store data to props
 * @param store - Application store
 */
export const mapStateToProps = store => ({
    userInfo: store.user.userInfo,
    comments: store.user.comments,
    isLoaded: store.user.isLoaded,
});

/**
 * Bind action creators
 */
export const mapDispatchToProps = {
    getOneUser: getOneUserAction,
    changeUserName: changeUserNameAction,
};

/**
 * Connected component
 */
export const UsersConnected = connect(mapStateToProps, mapDispatchToProps)(Users);
