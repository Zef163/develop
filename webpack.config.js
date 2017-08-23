const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');

const analyze = !!process.env.ANALYZE_ENV;
const env = process.env.NODE_ENV || 'development';

const webpackConfig = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    // Creates style nodes from JS strings
                    {loader: 'style-loader'},

                    // Translates CSS into CommonJS
                    {loader: 'css-loader'},

                    // Compiles Less to CSS
                    {
                        loader: 'less-loader',
                        options: {
                            strictMath: true,
                            noIeCompat: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ],
                    plugins: []
                },
                include: [
                    path.resolve(__dirname, 'src')
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ],
    resolve: {
        modules: [
            path.join(process.cwd(), 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx']
    },
    devtool: 'inline-source-map'
};

if (analyze) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

if (env === 'production') {
    webpackConfig.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            },
        })
    );
}


module.exports = webpackConfig;