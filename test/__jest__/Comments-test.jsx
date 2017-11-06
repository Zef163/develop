/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";
import {fromJS} from "immutable";

/**
 * Components
 */
import {Comments} from "components/Comments";
import Store from "redux/store";

/**
 * Setup
 */
function setup(isLoading = false) {
    // Replace 'window.console.error' to custom function
    console.error = jest.fn((warn) => {
        throw new Error(warn);
    });

    // Component props
    const defaultProps = {
        "comments": fromJS([]),
        "store": Store,
        "dispatch": Store.dispatch
    };

    // Data
    let comments = [
        {
            "id": "1",
            "text": "Non et atque. occaecati deserunt quas accusantium unde odit nobis qui voluptatem.",
            "commenter": {
                "id": "1",
                "name": "John Doe"
            }
        },
        {
            "id": "4",
            "text": "Harum non quasi et ratione. tempore iure ex voluptates in ratione.",
            "commenter": {
                "id": "2",
                "name": "Ervin Howell"
            }
        },
        {
            "id": "5",
            "text": "Quia molestiae reprehenderit quasi aspernatur.",
            "commenter": {
                "id": "3",
                "name": "Clementine Bauch"
            }
        }
    ];

    // Emulate 'react-router'
    const context = {
        "context": {
            "router": {
                "history": {
                    "push": () => {},
                    "replace": () => {},
                    "createHref": () => {}
                }
            }
        },
        "childContextTypes": {
            "router": PropTypes.object
        }
    };

    // Testing component
    const component = mount(<Comments {...defaultProps} />, context);

    // Emulate 'componentWillMount'
    component.setState({
        "isLoading": isLoading
    });

    return {
        defaultProps,
        comments,
        component
    };
}

/**
 * Test
 */
describe("Component 'Comments'", () => {

    it("PageLoader", () => {
        // Component for testing
        const {component} = setup(true);

        // Check exit component "PageLoader"
        expect(component.find("PageLoader")).toHaveLength(1);
    });

    it("Error404", () => {
        // Component for testing
        const {component} = setup();

        // Check exist component "Error404"
        expect(component.find("Error404")).toHaveLength(1);
    });

    it("DOM structure", () => {
        // Component for testing
        const {component, comments} = setup();

        // Emulate 'componentWillMount'
        component.setProps({
            "comments": fromJS(comments)
        });

        // Check exist component "Header"
        expect(component.find("Header")).toHaveLength(1);

        // Check exist component "CommentsGroup"
        expect(component.find("CommentsGroup")).toHaveLength(1);

        // Comments length
        let commentsLength = Object.keys(comments).length;

        // Check length components "Comment"
        expect(component.find("Comment")).toHaveLength(commentsLength);

        // Check length components "CommentAvatar"
        expect(component.find("CommentAvatar")).toHaveLength(commentsLength);

        // Check length components "CommentContent"
        expect(component.find("CommentContent")).toHaveLength(commentsLength);

        // Check length components "Link" from user page
        expect(component.find("CommentContent > Link")).toHaveLength(commentsLength);

        // Check length components "CommentText"
        expect(component.find("CommentText")).toHaveLength(commentsLength);

        // Check length components "CommentActions"
        expect(component.find("CommentActions")).toHaveLength(commentsLength);
    });

    it("render not empty component", () => {
        // Component for testing
        const {component, comments} = setup();

        // Emulate 'componentWillMount'
        component.setProps({
            "comments": fromJS(comments)
        });

        // Check comments
        component.find("CommentsItem").forEach((node, key) => {
            // Check link to user page
            expect(node.find("CommentContent > Link").prop("to")).toEqual(`/users/view/${comments[key].commenter.id}/`);

            // Check author name
            expect(node.find("CommentContent > Link").text()).toEqual(comments[key].commenter.name);

            // Check text
            expect(node.find("CommentText").text()).toEqual(comments[key].text);
        });
    });
});
