/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Image, Header, Icon} from "semantic-ui-react";
import Axios from "axios";

/**
 * Components
 */
import {CommentsGroup} from "components/Comments";
import Error404 from "Error404";
import PageLoader from "PageLoader";
import NoPhoto from "dist/img/no-photo.png";

export default class ArticlesOne extends React.Component {

    static propTypes = {
        "match": PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ])
    };

    static defaultProps = {
        "match": Object()
    };

    constructor (props) {
        super(props);

        this.state = {
            "article": Object(),
            "isLoading": true
        };
    }

    componentDidMount () {
        Axios.get("/api/data.json")
            .then(
                // Success
                (response) => {
                    let params = this.getParams(),
                        {data} = response;

                    if (Object.keys(params).length > 0) {
                        data = data.filter((item) => {
                            return parseInt(item.id) === parseInt(params.id);
                        });
                    }

                    this.setState({
                        "article": data.shift(),
                        "isLoading": false
                    });
                },
                // Error
                (error) => {
                    console.error(error);
                }
            );
    }

    getParams () {
        return this.props.match.params;
    }

    render () {
        let {article, isLoading} = this.state,
            articleID = parseInt(article.id);   // Article identifier at integer type

        if (Object.keys(article).length === 0) {
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
            <div key={`article-one__${article.id}`}>
                <Header as="h1">
                    <Link to="/articles/">
                        <Icon name="arrow left" />
                    </Link>
                    {article.title}
                </Header>
                <Image size="large" src={NoPhoto} />
                <p>{article.text}</p>
                <p>Author: {article.author.name}</p>

                <Header as="h2" dividing>Comments</Header>
                <CommentsGroup articleID={articleID} comments={article.comments} editForm form replyForm />
            </div>
        );
    }

}
