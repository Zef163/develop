/**
 * Libraries
 */
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * Component for testing
 */
import {CommentsItem} from "components/Comments";

/**
 * Emulate React.Router
 */
configure({
    adapter: new Adapter(),
});

/**
 * Mock components
 */
jest.mock('react-router-dom', () => ({Link: 'Link'}));

// Fixture
const comment = {
    id: "1",
    text: "Non et atque. occaecati deserunt quas accusantium unde odit nobis qui voluptatem.",
    commenter: {
        id: "1",
        name: "John Doe",
    },
};

let props;
let wrapper;
beforeEach(() => {
    // Mock 'window.console.error'
    console.error = jest.fn();

    props = {
        articleID: 0,
        data: {},
        editForm: false,
        replyForm: false,
        editComment: jest.fn(),
    };

    // Testing component
    wrapper = mount(<CommentsItem {...props} />);
});

/**
 * Test
 */
describe("Component 'CommentsItem'", () => {
    it("DOM structure", () => {
        // Set data
        wrapper.setProps({
            data: comment,
            editForm: true,
            replyForm: true,
        });

        // Check length components "Comment"
        expect(wrapper.find("Comment")).toHaveLength(1);

        // Check length components "CommentAvatar"
        expect(wrapper.find("CommentAvatar")).toHaveLength(1);

        // Check length components "CommentContent"
        expect(wrapper.find("CommentContent")).toHaveLength(1);

        // Check length components "Link" from user page
        expect(wrapper.find("CommentContent Link")).toHaveLength(1);

        // Check length components "CommentMetadata"
        expect(wrapper.find("CommentContent CommentMetadata")).toHaveLength(1);

        // Check length components "CommentText"
        expect(wrapper.find("CommentContent CommentText")).toHaveLength(1);

        // Check length components "CommentActions"
        expect(wrapper.find("CommentContent CommentActions")).toHaveLength(1);

        // Check length components "CommentAction" ("Reply" and "Edit")
        expect(wrapper.find("CommentContent CommentActions CommentAction")).toHaveLength(2);

        // Update data (remove edit form)
        wrapper.setProps({
            editForm: false,
        });

        // Check length components "CommentAction" ("Reply")
        expect(wrapper.find("CommentContent CommentActions CommentAction")).toHaveLength(1);

        // Update data (remove reply form)
        wrapper.setProps({
            replyForm: false,
        });

        // Check length components "CommentAction" ("Reply")
        expect(wrapper.find("CommentContent CommentActions CommentAction")).toHaveLength(0);
    });

    it("showing edit form", () => {
        // Set data
        wrapper.setProps({
            data: comment,
            editForm: true,
        });

        // Find edit button
        const editButton = wrapper.find("CommentActions CommentAction").findWhere(node => node.key() === "comment__action--edit");

        // Check that found
        expect(editButton).toHaveLength(1);

        // Check not rendered any forms
        expect(wrapper.find("Form")).toHaveLength(0);

        // Simulate click for showing form
        editButton.simulate("click");

        // Check rendered one form
        expect(wrapper.find("Form")).toHaveLength(1);

        const cancelButton = wrapper.find("Form Button").findWhere(node => node.prop("content") === "Cancel");

        // Check that found
        expect(cancelButton).toHaveLength(1);

        // Simutale click for hidden form
        cancelButton.simulate("click");

        // Check not rendered any forms
        expect(wrapper.find("Form")).toHaveLength(0);
    });

    it("showing reply form", () => {
        // Set data
        wrapper.setProps({
            data: comment,
            replyForm: true,
        });

        // Find reply button
        const replyButton = wrapper.find("CommentActions CommentAction").findWhere(node => node.key() === "comment__action--reply");

        // Check that found
        expect(replyButton).toHaveLength(1);

        // Check not rendered any forms
        expect(wrapper.find("Form")).toHaveLength(0);

        // Simulate click for showing form
        replyButton.simulate("click");

        // Check rendered one form
        expect(wrapper.find("Form")).toHaveLength(1);

        const cancelButton = wrapper.find("Form Button").findWhere(node => node.prop("content") === "Cancel");

        // Check that found
        expect(cancelButton).toHaveLength(1);

        // Simutale click for hidden form
        cancelButton.simulate("click");

        // Check not rendered any forms
        expect(wrapper.find("Form")).toHaveLength(0);
    });

    it("render empty component", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("render not empty component", () => {
        // Set data
        wrapper.setProps({
            data: comment,
            editForm: true,
            replyForm: true,
        });

        // Check link to user page
        expect(wrapper.find("CommentContent Link").prop("to")).toEqual(`/users/view/${comment.commenter.id}/`);

        // Check author name
        expect(wrapper.find("CommentContent Link").text()).toEqual(comment.commenter.name);

        // Check text
        expect(wrapper.find("CommentText").text()).toEqual(comment.text);
    });
});
