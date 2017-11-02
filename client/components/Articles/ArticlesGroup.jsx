/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Item} from "semantic-ui-react";

/**
 * Components
 */
import NoPhoto from "dist/img/no-photo.png";

export default class ArticlesGroup extends React.Component {

    static propTypes = {
        "elements": PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ])
    };

    static defaultProps = {
        "elements": Object()
    };

    render () {
        let {elements} = this.props;

        if (Object.keys(elements).length === 0) {
            return <p>Articles not found</p>;
        }

        return (
            <Item.Group>
                {elements.map((item) => {
                    return (
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
                    );
                })}
            </Item.Group>
        );
    }

}
