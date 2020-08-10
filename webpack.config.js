const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const  { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    devServer: {
        contentBase: './diist',
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'canvas demo',
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};