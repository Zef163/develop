import React, {Component} from 'react';
import ArticlesItem from './ArticlesItem';

export default class Articles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            articles: []
        }
    }

    componentDidMount() {
        return fetch('/api/articles.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    articles: responseJson
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let { articles } = this.state;

        return (
            <div>
                <ArticlesItem elements={articles} />
            </div>
        );
    }
}
