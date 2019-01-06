/**
 * Libraries
 */
import React, {Component} from "react";
import {Header} from "semantic-ui-react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

/**
 * Actions
 */
import {getAllArticles as getAllArticlesAction} from "redux/actions/ArticleActions";

/**
 * Components
 */
import {ArticlesGroup} from "components/Articles";
import {PageLoader} from "components/PageLoader";

/**
 * Articles component
 */
export class Articles extends Component {

    static propTypes = {
        articles: PropTypes.array,
        getAllArticles: PropTypes.func,
        isLoaded: PropTypes.bool,
    };

    /**
     * Method called after mounted component
     */
    componentDidMount() {
        const {articles, getAllArticles} = this.props;

        if (articles.length === 0) {
            getAllArticles();
        }
    }

    /**
     * Render JSX to HTML
     * @returns {Node} Rendered component
     */
    render() {
        const {articles, isLoaded} = this.props;

        if (articles.length === 0 && !isLoaded) {
            return <PageLoader show={!isLoaded} />;
        }

        return (
            <div>
                <Header as="h1">Articles</Header>
                <ArticlesGroup elements={articles} />
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
    getAllArticles: getAllArticlesAction,
};

/**
 * Connected component
 */
export const ArticlesConnected = connect(mapStateToProps, mapDispatchToProps)(Articles);
