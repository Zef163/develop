/**
 * Libraries
 */
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * Component for testing
 */
import {Users} from "components/Users";

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
jest.mock("components/Users/UsersItem", () => ({UsersItem: 'UsersItem'}));
jest.mock("components/Error404", () => ({Error404: 'Error404'}));
jest.mock("components/PageLoader", () => ({PageLoader: 'PageLoader'}));

// Fixture
const userID = 1;
const userInfo = {
    id: "1",
    name: "Leanne Graham",
};
const comments = [
    {
        id: "3",
        text: "Non et atque. occaecati deserunt quas accusantium unde odit nobis qui voluptatem.",
        commenter: {
            id: "1",
            name: "Leanne Graham",
        },
    },
    {
        id: "4",
        text: "Harum non quasi et ratione. tempore iure ex voluptates in ratione.",
        commenter: {
            id: "1",
            name: "Leanne Graham",
        },
    },
    {
        id: "5",
        text: "Quia molestiae reprehenderit quasi aspernatur.",
        commenter: {
            id: "1",
            name: "Leanne Graham",
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
        match: {
            params: {id: userID},
        },
        userInfo: {},
        comments: [],
        isLoaded: false,
        getOneUser: jest.fn(),
        changeUserName: jest.fn(),
    };

    // Testing component
    wrapper = mount(<Users {...props} />);
});

/**
 * Test
 */
describe("Component 'Users'", () => {
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
            userInfo,
            comments,
            isLoaded: true,
        });

        // Check exist component "Header"
        expect(wrapper.find("Header")).toHaveLength(1);

        // Check exist component "Grid"
        expect(wrapper.find("Grid")).toHaveLength(1);

        // Check exist component "GridRow"
        expect(wrapper.find("GridRow")).toHaveLength(2);

        // Check exist component "GridColumn"
        expect(wrapper.find("GridColumn")).toHaveLength(3);

        // Check exist component "UsersItem"
        expect(wrapper.find("UsersItem")).toHaveLength(1);

        // Check exist component "CommentsGroup"
        expect(wrapper.find("CommentsGroup")).toHaveLength(1);
    });
});
