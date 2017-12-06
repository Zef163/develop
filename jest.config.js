/**
 * Libraries
 */
const path = require("path");

/**
 * Jest config
 */
module.exports = {
    "verbose": true,
    "rootDir": __dirname,
    "modulePaths": [
        path.join(__dirname, "client"),
        path.join(__dirname, "client", "components")
    ],
    "moduleFileExtensions": [
        "js",
        "jsx"
    ],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js"
    },
    "testMatch": [
        "<rootDir>/test/__jest__/**/*.js?(x)"
    ],
    "testPathIgnorePatterns": []
};
