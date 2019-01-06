/**
 * Libraries
 */
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/**
 * Component for testing
 */
import {UsersItem} from "components/Users";

/**
 * Emulate React.Router
 */
configure({
    adapter: new Adapter(),
});

// Fixture
const userInfo = {
    id: "1",
    name: "Leanne Graham",
};

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
    wrapper = mount(<UsersItem {...props} />);
});

/**
 * Test
 */
describe("Component 'UsersItem'", () => {
    it("DOM structure", () => {
        // Set data
        wrapper.setProps({
            info: userInfo,
        });

        // Check exist component "Card"
        expect(wrapper.find("Card")).toHaveLength(1);

        // Check exist component "Image"
        expect(wrapper.find("Card Image")).toHaveLength(1);

        // Check exist component "CardContent"
        expect(wrapper.find("Card CardContent")).toHaveLength(3);

        // Check exist component "CardHeader"
        expect(wrapper.find("Card CardContent CardHeader")).toHaveLength(1);

        // Check exist component "CardMeta"
        expect(wrapper.find("Card CardContent CardMeta")).toHaveLength(1);

        // Check exist component "CardDescription"
        expect(wrapper.find("Card CardContent CardDescription")).toHaveLength(1);
    });

    it("render not empty component", () => {
        // Set data
        wrapper.setProps({
            info: userInfo,
        });

        // Check user name
        expect(wrapper.find("CardContent CardHeader").text()).toEqual(userInfo.name);

        // Check user description
        expect(wrapper.find("CardContent CardDescription").text()).toEqual(`${userInfo.name} is a musician living in Nashville.`);
    });
});
