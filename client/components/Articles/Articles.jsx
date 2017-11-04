/**
 * Libraries
 */
import React from "react";
import {Header} from "semantic-ui-react";
import {connect} from "react-redux";

/**
 * Actions
 */
import * as ArticleActions from "redux/actions/ArticleActions";

/**
 * Components
 */
import {ArticlesGroup} from "components/Articles";
import PageLoader from "PageLoader";

/**
 * Getting store
 */
@connect(store => ({ articles: store.articles }))

export default class Articles extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            "isLoading": true
        };
    }

    componentWillMount () {
        let {articles, dispatch} = this.props;

        if (articles.size === 0) {
            dispatch(ArticleActions.getAllArticles())
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
                })
        }
    }

    render () {
        let {articles} = this.props,
            {isLoading} = this.state;

        if (articles.size === 0 && isLoading) {
            return <PageLoader show={isLoading} />;
        }

        return (
            <div>
                <Header as="h1">Articles</Header>
                <ArticlesGroup elements={articles.toJS()} />
            </div>
        );
    }

}
