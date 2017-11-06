/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";

/**
 * Components
 */
import {UsersItem} from "components/Users";
import Store from "redux/store";

/**
 * Setup
 */
function setup() {
    // Replace 'window.console.error' to custom function
    console.error = jest.fn((warn) => {
        throw new Error(warn);
    });

    // Component props
    const defaultProps = {
        "info": Object(),
        "store": Store,
        "dispatch": Store.dispatch
    };

    // Data
    let userInfo = {
        "id": "1",
        "name": "Leanne Graham"
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
    const component = mount(<UsersItem {...defaultProps} />, context);

    return {
        defaultProps,
        userInfo,
        component
    };
}

/**
 * Test
 */
describe("Component 'UsersItem'", () => {

    it("DOM structure", () => {
        // Component for testing
        const {component, userInfo} = setup();

        // Set data
        component.setProps({
            "info": userInfo
        });

        // Check exist component "Card"
        expect(component.find("Card")).toHaveLength(1);

        // Check exist component "Image"
        expect(component.find("Card > Image")).toHaveLength(1);

        // Check exist component "CardContent"
        expect(component.find("Card > CardContent")).toHaveLength(3);

        // Check exist component "CardHeader"
        expect(component.find("Card > CardContent > CardHeader")).toHaveLength(1);

        // Check exist component "CardMeta"
        expect(component.find("Card > CardContent > CardMeta")).toHaveLength(1);

        // Check exist component "CardDescription"
        expect(component.find("Card > CardContent > CardDescription")).toHaveLength(1);
    });

    it("render not empty component", () => {
        // Component for testing
        const {component, userInfo} = setup();

        // Set data
        component.setProps({
            "info": userInfo
        });

        // Check user name
        expect(component.find("CardContent > CardHeader").text()).toEqual(userInfo.name);

        // Check user description
        expect(component.find("CardContent > CardDescription").text()).toEqual(`${userInfo.name} is a musician living in Nashville.`);
    });
});
