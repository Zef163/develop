const path = require("path");
const webpack = require("webpack");

const env = process.env.NODE_ENV || "development";

const webpackConfig = {
    "context": __dirname,
    "entry": "./client/index.jsx",
    "output": {
        "filename": "bundle.js",
        "path": path.resolve(__dirname, "client", "dist"),
        "publicPath": "/"
    },
    "module": {
        "rules": [
            {
                "test": /\.less$/,
                "use": [
                    // Creates style nodes from JS strings
                    {
                        "loader": "style-loader"
                    },

                    // Translates CSS into CommonJS
                    {
                        "loader": "css-loader"
                    },

                    // Compiles Less to CSS
                    {
                        "loader": "less-loader",
                        "options": {
                            "strictMath": true,
                            "noIeCompat": true
                        }
                    }
                ]
            },
            {
                "test": /\.jsx?$/,
                "loader": "babel-loader",
                "query": {
                    "presets": [
                        "react",
                        "es2015",
                        "stage-0"
                    ],
                    "plugins": ["transform-decorators-legacy"],
                    "cacheDirectory": env !== "production"
                },
                "include": [
                    path.resolve(__dirname, "client")
                ]
            },
            {
                "test": /\.png$/,
                "loader": "url-loader",
                "query": {
                    "mimetype": "image/png"
                }
            }
        ]
    },
    "plugins": [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(env)
        })
    ],
    "resolve": {
        "modules": [
            path.join(process.cwd(), "client"),
            path.join(process.cwd(), "client", "components"),
            "node_modules"
        ],
        "extensions": [
            ".js",
            ".jsx"
        ]
    },
    "devtool": "inline-source-map",
    "devServer": {
        "historyApiFallback": true,
        "hot": true,
        // "filename": "bundle.js",
        "contentBase": path.resolve(__dirname, "client"),
        "publicPath": "http://localhost:8080/dist/"
    }
};

switch (env) {
    case "production": {
        webpackConfig.plugins.push(
            new webpack.LoaderOptionsPlugin({
                "minimize": true,
                "debug": false
            }),
            new webpack.optimize.UglifyJsPlugin({
                "compress": {
                    "unused": true,
                    "dead_code": true,
                    "warnings": false
                }
            })
        );
        break;
    }
    case "development": {
        webpackConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        );
        break;
    }
    default: {
        break;
    }
}

module.exports = webpackConfig;
