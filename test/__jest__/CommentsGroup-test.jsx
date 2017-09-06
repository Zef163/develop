/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";

/**
 * Components
 */
import {CommentsGroup} from "js/Comments";

/**
 * Setup
 */
// Replace 'window.console.error' to custom function
console.error = jest.fn((warn) => {
    throw new Error(warn);
});

/**
 * Test
 */
describe("Component 'CommentsGroup' in js/Comments", () => {
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

    // Component options for testing
    const componentOptions = {
        "context": {
            // Emulate 'react-router'
            "router": {
                "history": {
                    "push": () => {},
                    "replace": () => {},
                    "createHref": () => {}
                }
            }
        },
        "childContextTypes": {
            "router": PropTypes.object.isRequired
        }
    };

    it("DOM structure", () => {
        // Component for testing
        const component = mount(<CommentsGroup />, componentOptions);

        // Set data
        component.setProps({
            "comments": comments,
            "replyForm": true,
            "editForm": true
        });

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

    it("render empty component", () => {
        // Component for testing
        const component = mount(<CommentsGroup />);

        // Check empty elements
        expect(component.find("CommentsGroup").text()).toEqual("Comments not found");

        // Check is render one DOM element in root
        expect(component).toHaveLength(1);
    });

    it("render not empty component", () => {
        // Component for testing
        const component = mount(<CommentsGroup />, componentOptions);

        // Set data
        component.setProps({
            "comments": comments,
            "replyForm": true,
            "editForm": true
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
