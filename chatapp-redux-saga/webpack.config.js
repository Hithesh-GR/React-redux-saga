const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    target: 'node',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: '/(node_modules)/',
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/react', "@babel/env", '@babel/es2015']
                    }
                }],
            },
            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[path][name]-[hash:8].[ext]'
                    },
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    // style-loader
                    {
                        loader: 'style-loader',
                    },
                    // css-loader
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    // scss-loader
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.scss']
    }
}