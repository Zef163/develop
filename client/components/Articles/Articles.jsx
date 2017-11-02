/**
 * Libraries
 */
import React from "react";
import Axios from "axios";
import {Header} from "semantic-ui-react";

/**
 * Components
 */
import {ArticlesGroup} from "components/Articles";

export default class Articles extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            "articles": Object()
        };
    }

    componentDidMount () {
        Axios.get("/api/data.json")
            .then(
                // Success
                (response) => {
                    this.setState({
                        "articles": response.data
                    });
                },
                // Error
                (error) => {
                    console.error(error);
                }
            );
    }

    render () {
        let {articles} = this.state;

        return (
            <div>
                <Header as="h1">Articles</Header>
                <ArticlesGroup elements={articles} />
            </div>
        );
    }

}
