/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";

/**
 * Components
 */
import {ArticlesGroup} from "components/Articles";
import Store from "redux/store";

/**
 * Setup function
 */
function setup() {
    // Replace 'window.console.error' to custom function
    console.error = jest.fn((warn) => {
        throw new Error(warn);
    });

    // Component props
    const defaultProps = {
        "elements": Object(),
        "store": Store,
        "dispatch": Store.dispatch
    };

    // Data
    const articles = [
        {
            "id": "1",
            "author": {
                "id": "1",
                "name": "John Doe"
            },
            "title": "Title description",
            "text": "Article description",
            "comments": []
        },
        {
            "id": "2",
            "author": {
                "id": "1",
                "name": "John Doe"
            },
            "title": "Title",
            "text": "Article",
            "comments": []
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
    const component = mount(<ArticlesGroup {...defaultProps} />, context);

    return {
        defaultProps,
        articles,
        component
    };
}

/**
 * Test
 */
describe("Component 'ArticlesGroup'", () => {

    it("DOM structure", () => {
        // Component for testing
        const {component, articles} = setup();

        // Check not exist component "Item.Group"
        expect(component.find("ItemGroup")).toHaveLength(0);

        // Set data
        component.setProps({
            "elements": articles
        });

        // Check exist component "Item.Group"
        expect(component.find("ItemGroup")).toHaveLength(1);

        // Count article elements
        let countElements = Object.keys(articles).length;

        // Check length components "Item"
        expect(component.find("Item")).toHaveLength(countElements);

        // Check length components "ItemImage"
        expect(component.find("ItemImage")).toHaveLength(countElements);

        // Check length components "ItemContent"
        expect(component.find("ItemContent")).toHaveLength(countElements);

        // Check length components "ItemHeader"
        expect(component.find("ItemHeader")).toHaveLength(countElements);

        // Check length components "ItemMeta"
        expect(component.find("ItemMeta")).toHaveLength(countElements);

        // Check is render one DOM element in root
        expect(component).toHaveLength(1);
    });

    it("render empty component", () => {
        // Component for testing
        const {component} = setup();

        // Check empty elements
        expect(component.first("p").text()).toEqual("Articles not found");

        // Check is render one DOM element in root
        expect(component).toHaveLength(1);
    });

    it("render not empty component", () => {
        // Component for testing
        const {component, articles} = setup();

        // Set data
        component.setProps({
            "elements": articles
        });

        // Check title article
        component.find("ItemHeader > Link").forEach((node, key) => {
            expect(node.text()).toEqual(articles[key].title);
        });

        // Check description
        component.find("ItemMeta").forEach((node, key) => {
            expect(node.text()).toEqual(articles[key].text);
        });
    });
});