/**
 * Libraries
 */import React from "react";
import {Header} from "semantic-ui-react";
import Axios from "axios";

/**
 * Components
 */
import {CommentsGroup} from "components/Comments";
import Error404 from "Error404";
import PageLoader from "PageLoader";

export default class Comments extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            "comments": Object(),
            "isLoading": true
        };
    }

    componentDidMount () {
        Axios.get("/api/data.json")
            .then(
                // Success
                (response) => {
                    let {data} = response,
                        comments = [];

                    for (let article of data) {
                        if (Object.prototype.hasOwnProperty.call(article, "comments")) {
                            for (let comment of article.comments) {
                                comments.push(comment);
                            }
                        }
                    }

                    this.setState({
                        "comments": comments,
                        "isLoading": false
                    });
                },
                // Error
                (error) => {
                    console.error(error);
                }
            );
    }

    render () {
        let {comments, isLoading} = this.state;

        if (Object.keys(comments).length === 0) {
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
            <div>
                <Header as="h1">Comments</Header>
                <CommentsGroup comments={comments} editForm />
            </div>
        );
    }

}
