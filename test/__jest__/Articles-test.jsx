/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";

/**
 * Components
 */
import {Articles} from "client/components/Articles";

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
describe("Component 'Articles' in js/Articles", () => {
    // Component for testing
    const component = mount(<Articles />, {
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
    });

    it("DOM structure", () => {
        // Check exist component "Header"
        expect(component.find("Header")).toHaveLength(1);

        // Check exist component "ArticlesGroup"
        expect(component.find("ArticlesGroup")).toHaveLength(1);
    });

    it("render empty component", () => {
        // Check exist tag H1
        expect(component.find("h1.header")).toHaveLength(1);

        // Check empty elements
        expect(component.find("p").at(0).text()).toEqual("Articles not found");

        // Check is render one DOM element in root
        expect(component).toHaveLength(1);
    });

    it("render not empty component", () => {
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

        // Emulate 'componentDidMount'
        component.setState({
            "articles": [article]
        });

        // Check title article
        expect(component.find("ItemHeader > Link").text()).toEqual(article.title);

        // Check description
        expect(component.find("ItemMeta").text()).toEqual(article.text);
    });
});
