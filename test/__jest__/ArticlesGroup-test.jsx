/**
 * Libraries
 */
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * Component for testing
 */
import {ArticlesGroup} from "components/Articles";

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
const articles = [
    {
        id: "1",
        author: {
            id: "1",
            name: "John Doe",
        },
        title: "Title description",
        text: "Article description",
        comments: [],
    },
    {
        id: "2",
        author: {
            id: "1",
            name: "John Doe",
        },
        title: "Title",
        text: "Article",
        comments: [],
    },
];

let props;
let wrapper;
beforeEach(() => {
    // Mock 'window.console.error'
    console.error = jest.fn();

    // Component props
    props = {
        elements: [],
    };

    // Testing wrapper
    wrapper = mount(<ArticlesGroup {...props} />);
});

/**
 * Test
 */
describe("Component 'ArticlesGroup'", () => {
    it("DOM structure", () => {

        // Check not exist wrapper "Item.Group"
        expect(wrapper.find("ItemGroup")).toHaveLength(0);

        // Set data
        wrapper.setProps({
            elements: articles,
        });

        // Check exist wrapper "Item.Group"
        expect(wrapper.find("ItemGroup")).toHaveLength(1);

        // Count article elements
        const countElements = Object.keys(articles).length;

        // Check length components "Item"
        expect(wrapper.find("Item")).toHaveLength(countElements);

        // Check length components "ItemImage"
        expect(wrapper.find("ItemImage")).toHaveLength(countElements);

        // Check length components "ItemContent"
        expect(wrapper.find("ItemContent")).toHaveLength(countElements);

        // Check length components "ItemHeader"
        expect(wrapper.find("ItemHeader")).toHaveLength(countElements);

        // Check length components "ItemMeta"
        expect(wrapper.find("ItemMeta")).toHaveLength(countElements);

        // Check is render one DOM element in root
        expect(wrapper).toHaveLength(1);
    });

    it("render empty wrapper", () => {
        // Check empty elements
        expect(wrapper.first("p").text()).toEqual("Articles not found");

        // Check is render one DOM element in root
        expect(wrapper).toHaveLength(1);
    });

    it("render not empty wrapper", () => {
        // Set data
        wrapper.setProps({
            elements: articles,
        });

        // Check title article
        wrapper.find("ItemHeader > Link").forEach((node, key) => {
            expect(node.text()).toEqual(articles[key].title);
        });

        // Check description
        wrapper.find("ItemMeta").forEach((node, key) => {
            expect(node.text()).toEqual(articles[key].text);
        });
    });
});
