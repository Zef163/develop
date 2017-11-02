/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";

/**
 * Components
 */
import {CommentsItem} from "client/components/Comments";

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
describe("Component 'CommentsItem' in js/Comments", () => {
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

    // Data
    let comment = {
        "id": "1",
        "text": "Non et atque. occaecati deserunt quas accusantium unde odit nobis qui voluptatem.",
        "commenter": {
            "id": "1",
            "name": "John Doe"
        }
    };

    it("DOM structure", () => {
        // Component for testing
        const component = mount(<CommentsItem />, componentOptions);

        // Set data
        component.setProps({
            "data": comment,
            "editForm": true,
            "replyForm": true
        });

        // Check length components "Comment"
        expect(component.find("Comment")).toHaveLength(1);

        // Check length components "CommentAvatar"
        expect(component.find("CommentAvatar")).toHaveLength(1);

        // Check length components "CommentContent"
        expect(component.find("CommentContent")).toHaveLength(1);

        // Check length components "Link" from user page
        expect(component.find("CommentContent > Link")).toHaveLength(1);

        // Check length components "CommentMetadata"
        expect(component.find("CommentContent > CommentMetadata")).toHaveLength(1);

        // Check length components "CommentText"
        expect(component.find("CommentContent > CommentText")).toHaveLength(1);

        // Check length components "CommentActions"
        expect(component.find("CommentContent > CommentActions")).toHaveLength(1);

        // Check length components "CommentAction" ("Reply" and "Edit")
        expect(component.find("CommentContent > CommentActions > CommentAction")).toHaveLength(2);

        // Update data (remove edit form)
        component.setProps({
            "editForm": false
        });

        // Check length components "CommentAction" ("Reply")
        expect(component.find("CommentContent > CommentActions > CommentAction")).toHaveLength(1);

        // Update data (remove reply form)
        component.setProps({
            "replyForm": false
        });

        // Check length components "CommentAction" ("Reply")
        expect(component.find("CommentContent > CommentActions > CommentAction")).toHaveLength(0);
    });

    it("showing edit form", () => {
        // Component for testing
        const component = mount(<CommentsItem />, componentOptions);

        // Set data
        component.setProps({
            "data": comment,
            "editForm": true
        });

        // Find edit button
        let editButton = component.find("CommentActions > CommentAction").findWhere((node) => {
            return node.key() === "comment__action--edit";
        });

        // Check that found
        expect(editButton).toHaveLength(1);

        // Check not rendered any forms
        expect(component.find("Form")).toHaveLength(0);

        // Simulate click for showing form
        editButton.simulate("click");

        // Check rendered one form
        expect(component.find("Form")).toHaveLength(1);

        let cancelButton = component.find("Form > Button").findWhere((node) => {
            return node.prop("content") === "Cancel";
        });

        // Check that found
        expect(cancelButton).toHaveLength(1);

        // Simutale click for hidden form
        cancelButton.simulate("click");

        // Check not rendered any forms
        expect(component.find("Form")).toHaveLength(0);
    });

    it("showing reply form", () => {
        // Component for testing
        const component = mount(<CommentsItem />, componentOptions);

        // Set data
        component.setProps({
            "data": comment,
            "replyForm": true
        });

        // Find reply button
        let replyButton = component.find("CommentActions > CommentAction").findWhere((node) => {
            return node.key() === "comment__action--reply";
        });

        // Check that found
        expect(replyButton).toHaveLength(1);

        // Check not rendered any forms
        expect(component.find("Form")).toHaveLength(0);

        // Simulate click for showing form
        replyButton.simulate("click");

        // Check rendered one form
        expect(component.find("Form")).toHaveLength(1);

        let cancelButton = component.find("Form > Button").findWhere((node) => {
            return node.prop("content") === "Cancel";
        });

        // Check that found
        expect(cancelButton).toHaveLength(1);

        // Simutale click for hidden form
        cancelButton.simulate("click");

        // Check not rendered any forms
        expect(component.find("Form")).toHaveLength(0);
    });

    it("render empty component", () => {
        // Component for testing
        const component = mount(<CommentsItem />);

        // Check empty component
        expect(component.exists()).toBe(true);
    });

    it("render not empty component", () => {
        // Component for testing
        const component = mount(<CommentsItem />, componentOptions);

        // Set data
        component.setProps({
            "data": comment,
            "editForm": true,
            "replyForm": true
        });

        // Check link to user page
        expect(component.find("CommentContent > Link").prop("to")).toEqual(`/users/view/${comment.commenter.id}/`);

        // Check author name
        expect(component.find("CommentContent > Link").text()).toEqual(comment.commenter.name);

        // Check text
        expect(component.find("CommentText").text()).toEqual(comment.text);
    });
});
