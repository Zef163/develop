/**
 * Libraries
 */
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * Component for testing
 */
import {ArticlesOne} from "components/Articles";

/**
 * Emulate React.Router
 */
configure({
    adapter: new Adapter(),
});

/**
 * Mock components
 */
jest.mock("components/Comments", () => ({CommentsGroup: 'CommentsGroup'}));
jest.mock("components/Error404", () => ({Error404: 'Error404'}));
jest.mock("components/PageLoader", () => ({PageLoader: 'PageLoader'}));
jest.mock("react-router-dom", () => ({Link: 'Link'}));

// Fixture
const article = {
    id: "2",
    author: {
        id: "1",
        name: "John Doe",
    },
    title: "Title",
    text: "Article",
    comments: [
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
    ],
};

let props;
let wrapper;
beforeEach(() => {
    // Mock 'window.console.error'
    console.error = jest.fn();

    // Component props
    props = {
        getOneArticle: jest.fn(),
        articleID: 2,
        articles: [],
        isLoaded: false,
        match: {params: {id: 2}},
    };

    // Testing component
    wrapper = mount(<ArticlesOne {...props} />);
});

/**
 * Test
 */
describe("Component 'ArticlesOne'", () => {
    it("should render <PageLoader />", () => {
        expect(wrapper.find("PageLoader")).toHaveLength(1);
    });

    it("should render <Error404 />", () => {
        wrapper.setProps({isLoaded: true});
        expect(wrapper.find("Error404")).toHaveLength(1);
    });

    it("DOM structure", () => {
        // Emulate 'componentDidMount'
        wrapper.setProps({
            articles: [article],
        });

        // Check exist component "Header"
        expect(wrapper.find("Header")).toHaveLength(2);
        expect(wrapper.find("h1")).toHaveLength(1);   // One tag h1
        expect(wrapper.find("h2")).toHaveLength(1);   // One tag h2

        // Check exist "Go back" link
        expect(wrapper.find("Header Link")).toHaveLength(1);

        // Check exist component "Image"
        expect(wrapper.find("Image")).toHaveLength(1);

        // Check exist tag "P"
        expect(wrapper.find("p")).toHaveLength(2);    // Article title and author name

        // Check exist component "CommentsGroup"
        expect(wrapper.find("CommentsGroup")).toHaveLength(1);

        // Check is render one DOM element in root
        expect(wrapper).toHaveLength(1);
    });
});
