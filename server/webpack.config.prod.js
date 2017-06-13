var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: __dirname+"/public",
        filename: 'bundle.js',
        publicPath: './client/'
    },

    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'client'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};