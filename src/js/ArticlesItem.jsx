import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';

export default class ArticlesItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { elements } = this.props;

        return (
            <Item.Group>
                {elements.map((item, key) => {
                    return (
                        <Item key={`article__${item.id}`}>
                            <Item.Image size='tiny' src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
                            <Item.Content>
                                <Item.Header>
                                    <Link to={`/articles/view/${item.id}/`}>{item.title}</Link>
                                </Item.Header>
                                <Item.Meta>
                                    <span>{item.text}</span>
                                </Item.Meta>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        );
    }
}