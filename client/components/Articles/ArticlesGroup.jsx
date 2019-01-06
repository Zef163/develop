/**
 * Libraries
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Item} from "semantic-ui-react";

/**
 * Components
 */
import NoPhoto from "dist/img/no-photo.png";

/**
 * Articles group component
 */
export class ArticlesGroup extends Component {

    static propTypes = {
        elements: PropTypes.array,
    };

    static defaultProps = {
        elements: [],
    };

    render() {
        const {elements} = this.props;

        if (elements.length === 0) {
            return <p>Articles not found</p>;
        }

        return (
            <Item.Group>
                {elements.map(item => (
                    <Item key={`article__${item.id}`}>
                        <Item.Image size="tiny" src={NoPhoto} />
                        <Item.Content>
                            <Item.Header>
                                <Link to={`/articles/view/${item.id}/`}>{item.title}</Link>
                            </Item.Header>
                            <Item.Meta>
                                <span>{item.text}</span>
                            </Item.Meta>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        );
    }

}
