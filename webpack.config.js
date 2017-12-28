const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports ={
    entry: './src/index',
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, './dist/')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test:/\.js/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {"presets": ["env"]}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.hbs/,
                use: ['handlebars-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            title: 'Caching',
            template: './src/index.hbs'
        }),
        new CleanWebpackPlugin(['dist']),

    ]

}