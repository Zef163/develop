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
import {Articles} from "components/Articles";
import Store from "redux/store";

/**
 * Setup function
 */
function setup(isLoading = false) {
    // Replace 'window.console.error' to custom function
    console.error = jest.fn((warn) => {
        throw new Error(warn);
    });

    // Component props
    const defaultProps = {
        "articles": fromJS([]),
        "store": Store,
        "dispatch": Store.dispatch
    };

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
    const component = mount(<Articles {...defaultProps} />, context);

    // Emulate 'componentWillMount'
    component.setState({
        "isLoading": isLoading
    });

    return {
        defaultProps,
        component
    };
}

/**
 * Test
 */
describe("Component 'Articles'", () => {

    it("PageLoader", () => {
        // Component for testing
        const {component} = setup(true);

        // Check exit component "PageLoader"
        expect(component.find("PageLoader")).toHaveLength(1);
    });

    it("DOM structure", () => {
        // Component for testing
        const {component} = setup();

        // Check component "Header"
        expect(component.find("Header")).toHaveLength(1);
        expect(component.find("Header").text()).toEqual("Articles");

        // Check component "ArticlesGroup"
        expect(component.find("ArticlesGroup")).toHaveLength(1);
        expect(component.find("ArticlesGroup").text()).toEqual("Articles not found");
    });

    it("render not empty component", () => {
        // Component for testing
        const {component} = setup();

        // Default props
        let article = {
            "id": "1",
            "author": {
                "id": "1",
                "name": "John Doe"
            },
            "title": "Title description",
            "text": "Article description",
            "comments": []
        };

        // Emulate 'componentWillMount'
        component.setProps({
            "articles": fromJS([article])
        });

        // Check title article
        expect(component.find("ItemHeader > Link").text()).toEqual(article.title);

        // Check description
        expect(component.find("ItemMeta").text()).toEqual(article.text);
    });
});
