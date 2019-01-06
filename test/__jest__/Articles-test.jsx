/**
 * Libraries
 */
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * Component for testing
 */
import {Articles} from "components/Articles";

/**
 * Emulate React.Router
 */
configure({
    adapter: new Adapter(),
});

/**
 * Mock components
 */
jest.mock("components/Articles/ArticlesGroup", () => ({ArticlesGroup: 'ArticlesGroup'}));
jest.mock("components/PageLoader", () => ({
    PageLoader: "PageLoader",
}));

let props;
let wrapper;
beforeEach(() => {
    // Mock 'window.console.error'
    console.error = jest.fn();

    // Component props
    props = {
        articles: [],
        getAllArticles: jest.fn(),
        isLoaded: false,
    };

    // Testing component
    wrapper = mount(<Articles {...props} />);
});


/**
 * Test component 'Articles'
 */
describe("Component 'Articles'", () => {
    it("should render <PageLoader />", () => {
        expect(wrapper.find("PageLoader")).toHaveLength(1);
    });

    it("should renders correctly", () => {
        // Emulate loaded data
        wrapper.setProps({
            isLoaded: true,
        });

        // Check component "Header"
        expect(wrapper.find("Header")).toHaveLength(1);
        expect(wrapper.find("Header").text()).toEqual("Articles");

        // Check component "ArticlesGroup"
        expect(wrapper.find("ArticlesGroup")).toHaveLength(1);
    });
});
