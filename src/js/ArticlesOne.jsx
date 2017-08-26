import React, {Component} from 'react';
import { Item } from 'semantic-ui-react';
import Error404 from './Error404';
import PageLoader from './PageLoader';

export default class ArticlesOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            article: []
        }
    }

    componentDidMount() {
        return fetch('/api/articles.json')
            .then((response) => response.json())
            .then((responseJson) => {
                let params = this.getParams();

                if (Object.keys(params).length > 0) {
                    responseJson = responseJson.filter((item, key) => {
                        return parseInt(item.id) === parseInt(params.id);
                    });
                }

                this.setState({
                    isLoading: false,
                    article: responseJson.shift()
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getParams() {
        let result = {};

        if (typeof this.props !== "undefined") {
            if (typeof this.props.match !== "undefined") {
                if (typeof this.props.match.params !== "undefined") {
                    result = this.props.match.params;
                }
            }
        }

        return result;
    }

    render() {
        let { article, isLoading } = this.state;

        if (Object.keys(article).length === 0) {
            if (isLoading) {
                return (
                    <PageLoader show={isLoading} />
                )
            } else {
                return (
                    <Error404 />
                )
            }
        }

        return (
            <div>
                <Item.Group>
                    <Item key={`article-one__${article.id}`}>
                        <Item.Image size='tiny' src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
                        <Item.Content>
                            <Item.Header>{article.title}</Item.Header>
                            <Item.Meta>
                                <p>{article.text}</p>
                                <p>Author: {article.author.name}</p>
                            </Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>
                <h2>Comments</h2>

            </div>
        );
    }
}
