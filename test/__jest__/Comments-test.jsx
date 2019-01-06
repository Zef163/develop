/**
 * Libraries
 */
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * Component for testing
 */
import {Comments} from "components/Comments";

/**
 * Emulate React.Router
 */
configure({
    adapter: new Adapter(),
});

/**
 * Mock components
 */
jest.mock("components/Comments/CommentsGroup", () => ({CommentsGroup: 'CommentsGroup'}));
jest.mock("components/Error404", () => ({Error404: 'Error404'}));
jest.mock("components/PageLoader", () => ({PageLoader: 'PageLoader'}));

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
        comments: [],
        getAllComments: jest.fn(),
        isLoaded: false,
    };

    // Testing component
    wrapper = mount(<Comments {...props} />);
});

/**
 * Test
 */
describe("Component 'Comments'", () => {
    it("should render <PageLoader />", () => {
        expect(wrapper.find("PageLoader")).toHaveLength(1);
    });

    it("Error404", () => {
        // Emulate loaded data
        wrapper.setProps({isLoaded: true});

        // Check exist component "Error404"
        expect(wrapper.find("Error404")).toHaveLength(1);
    });

    it("DOM structure", () => {
        // Emulate loaded data
        wrapper.setProps({
            comments,
            isLoaded: true,
        });

        // Check exist component "Header"
        expect(wrapper.find("Header")).toHaveLength(1);

        // Check exist component "CommentsGroup"
        expect(wrapper.find("CommentsGroup")).toHaveLength(1);
    });
});
