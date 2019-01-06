/**
 * Libraries
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Image, Header, Icon} from "semantic-ui-react";
import {connect} from "react-redux";

/**
 * Actions
 */
import {getOneArticle as getOneArticleAction} from "redux/actions/ArticleActions";

/**
 * Components
 */
import {CommentsGroup} from "components/Comments";
import {Error404} from "components/Error404";
import {PageLoader} from "components/PageLoader";
import NoPhoto from "dist/img/no-photo.png";

export class ArticlesOne extends Component {

    static propTypes = {
        match: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]),
        getOneArticle: PropTypes.func,
        articles: PropTypes.array,
        isLoaded: PropTypes.bool,
    };

    static defaultProps = {
        match: Object(),
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getOneArticle} = this.props;

        const articleID = this.getArticleID();
        getOneArticle(articleID);
    }

    /**
     * Function for get article identification number
     */
    getArticleID() {
        const {params} = this.props.match;
        return Number(params.id || 0);
    }

    render() {
        const {articles, isLoaded} = this.props;
        const articleID = this.getArticleID();
        const article = articles.find(item => Number(item.id) === articleID) || {};
        const comments = article.comments || [];

        if (Object.keys(article).length === 0) {
            return isLoaded ? <Error404 /> : <PageLoader show />;
        }

        return (
            <div key={`article-one__${articleID}`}>
                <Header as="h1">
                    <Link to="/articles/">
                        <Icon name="arrow left" />
                    </Link>
                    {article.title || ''}
                </Header>
                <Image size="large" src={NoPhoto} />
                <p>{article.text || ''}</p>
                <p>Author: {article?.author?.name || ''}</p>

                <Header as="h2" dividing>Comments</Header>
                <CommentsGroup articleID={articleID} comments={comments} editForm form replyForm />
            </div>
        );
    }

}

/**
 * Fetch store data to props
 * @param store - Application store
 */
export const mapStateToProps = store => ({
    articles: store.articles.items,
    isLoaded: store.articles.isLoaded,
});

/**
 * Bind action creators
 */
export const mapDispatchToProps = {
    getOneArticle: getOneArticleAction,
};

/**
 * Connected component
 */
export const ArticlesOneConnected = connect(mapStateToProps, mapDispatchToProps)(ArticlesOne);
