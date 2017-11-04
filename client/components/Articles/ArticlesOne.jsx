/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Image, Header, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import Immutable from "immutable";

/**
 * Actions
 */
import * as ArticleActions from "redux/actions/ArticleActions";

/**
 * Components
 */
import {CommentsGroup} from "components/Comments";
import Error404 from "Error404";
import PageLoader from "PageLoader";
import NoPhoto from "dist/img/no-photo.png";

/**
 * Getting store
 */
@connect(store => ({ articles: store.articles }))

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
            "isLoading": true
        };
    }

    componentWillMount () {
        let {dispatch} = this.props,
            articleID = this.getArticleID();

        dispatch(ArticleActions.getOneArticles(articleID))
            .then(res => {
                this.setState({
                    "isLoading": false
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    "isLoading": false
                });
            });
    }

    /**
     * Function for get article identification number
     */
    getArticleID () {
        let {params} = this.props.match,
            articleID = 0;

        if (Object.prototype.hasOwnProperty.call(params, "id")) {
            articleID = params.id;
        }

        return parseInt(articleID);
    }

    render () {
        let {articles} = this.props,
            articleID = this.getArticleID(),
            article = articles.filter(item => Number(item.get("id")) === articleID).first() || Immutable.fromJS({}),
            comments = article.getIn(["comments"], Immutable.fromJS([])),
            {isLoading} = this.state;

        if (article.size === 0) {
            return isLoading ? <PageLoader show={isLoading} /> : <Error404 />;
        }

        return (
            <div key={`article-one__${articleID}`}>
                <Header as="h1">
                    <Link to="/articles/">
                        <Icon name="arrow left" />
                    </Link>
                    {article.getIn(["title"], "")}
                </Header>
                <Image size="large" src={NoPhoto} />
                <p>{article.getIn(["text"], "")}</p>
                <p>Author: {article.getIn(["author", "name"], "")}</p>

                <Header as="h2" dividing>Comments</Header>
                <CommentsGroup articleID={articleID} comments={comments.toJS()} editForm form replyForm />
            </div>
        );
    }

}
