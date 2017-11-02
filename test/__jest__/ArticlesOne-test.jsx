/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";

/**
 * Components
 */
import {ArticlesOne} from "client/components/Articles";

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
describe("Component 'ArticlesOne' in js/Articles", () => {
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
    let article = {
        "id": "2",
        "author": {
            "id": "1",
            "name": "John Doe"
        },
        "title": "Title",
        "text": "Article",
        "comments": [
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
        ]
    };

    it("PageLoader", () => {
        // Component for testing
        const component = mount(<ArticlesOne />);

        // Check exit component "PageLoader"
        expect(component.find("PageLoader")).toHaveLength(1);
    });

    it("Error404", () => {
        // Component for testing
        const component = mount(<ArticlesOne />);

        // Emulate 'componentDidMount'
        component.setState({
            "isLoading": false
        });

        // Check exist component "Error404"
        expect(component.find("Error404")).toHaveLength(1);
    });

    it("DOM structure", () => {
        // Component for testing
        const component = mount(<ArticlesOne />, componentOptions);

        // Emulate 'componentDidMount'
        component.setState({
            "isLoading": false,
            "article": article
        });

        // Check exist component "Header"
        expect(component.find("Header")).toHaveLength(2);
        expect(component.find("h1")).toHaveLength(1);   // One tag h1
        expect(component.find("h2")).toHaveLength(1);   // One tag h2

        // Check exist "Go back" link
        expect(component.find("Header > Link")).toHaveLength(1);

        // Check exist component "Image"
        expect(component.find("Image")).toHaveLength(1);

        // Check exist tag "P"
        expect(component.find("p")).toHaveLength(2);    // Article title and author name

        // Check exist component "CommentsGroup"
        expect(component.find("CommentsGroup")).toHaveLength(1);

        // Check length component "CommentsItem"
        expect(component.find("CommentsItem")).toHaveLength(Object.keys(article.comments).length);

        // Check is render one DOM element in root
        expect(component).toHaveLength(1);
    });

    it("render not empty component", () => {
        // Component for testing
        const component = mount(<ArticlesOne />, componentOptions);

        // Emulate 'componentDidMount'
        component.setState({
            "isLoading": false,
            "article": article
        });

        // Check title
        expect(component.find("Header").at(0).text()).toEqual(article.title);

        // Check description
        expect(component.find("p").at(0).text()).toEqual(article.text);

        // Check author
        expect(component.find("p").at(1).text()).toEqual(`Author: ${article.author.name}`);

        // Check comments
        component.find("CommentsItem").forEach((node, key) => {
            // Check link to user page
            expect(node.find("CommentContent > Link").prop("to")).toEqual(`/users/view/${article.comments[key].commenter.id}/`);

            // Check author name
            expect(node.find("CommentContent > Link").text()).toEqual(article.comments[key].commenter.name);

            // Check text
            expect(node.find("CommentText").text()).toEqual(article.comments[key].text);
        });
    });
});