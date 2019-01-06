/**
 * Libraries
 */
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * Component for testing
 */
import {CommentsGroup} from "components/Comments";

/**
 * Emulate React.Router
 */
configure({
    adapter: new Adapter(),
});

/**
 * Mock components
 */
jest.mock("components/Comments/CommentsItem", () => ({CommentsItemConnected: 'CommentsItemConnected'}));

// Fixture
const comments = [
    {
        id: "1",
        text: "Non et atque. occaecati deserunt quas accusantium unde odit nobis qui voluptatem.",
        commenter: {
            id: "1",
            name: "John Doe",
        },
    },
    {
        id: "4",
        text: "Harum non quasi et ratione. tempore iure ex voluptates in ratione.",
        commenter: {
            id: "2",
            name: "Ervin Howell",
        },
    },
    {
        id: "5",
        text: "Quia molestiae reprehenderit quasi aspernatur.",
        commenter: {
            id: "3",
            name: "Clementine Bauch",
        },
    },
];

let props;
let wrapper;
beforeEach(() => {
    // Mock 'window.console.error'
    console.error = jest.fn();

    // Component props
    props = {
        articleID: 0,
        comments: [],
        editForm: false,
        form: false,
        replyForm: false,
    };

    // Testing component
    wrapper = mount(<CommentsGroup {...props} />);
});

/**
 * Test
 */
describe("Component 'CommentsGroup'", () => {
    it("DOM structure", () => {
        // Set data
        wrapper.setProps({
            comments,
            replyForm: true,
            editForm: true,
        });

        // Check length components "Comment"
        expect(wrapper.find("CommentsItemConnected")).toHaveLength(Object.keys(comments).length);
    });

    it("render empty component", () => {
        // Check empty elements
        expect(wrapper.find("CommentsGroup").text()).toEqual("Comments not found");

        // Check is render one DOM element in root
        expect(wrapper).toHaveLength(1);
    });

    it("render not empty component", () => {
        // Set data
        wrapper.setProps({
            comments,
            replyForm: true,
            editForm: true,
        });

        // Check comments
        wrapper.find("CommentsItem").forEach((node, key) => {
            // Check link to user page
            expect(node.find("CommentContent > Link").prop("to")).toEqual(`/users/view/${comments[key].commenter.id}/`);

            // Check author name
            expect(node.find("CommentContent > Link").text()).toEqual(comments[key].commenter.name);

            // Check text
            expect(node.find("CommentText").text()).toEqual(comments[key].text);
        });
    });
});
