const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const _externals = require('externals-dependencies');
const WebpackBar = require('webpackbar');

let externals = _externals();
const env = process.env.NODE_ENV;

module.exports = {
    watch: true,
    mode: 'development',
    stats: 'none',
    target: 'node',
    devtool: 'source-map',
    entry: './src/index.js',
    node: {
        __filename: false,
        __dirname: false,
    },
    resolve: {
        alias: {
            server: path.resolve(__dirname, 'src/server/'),
            schema: path.resolve(__dirname, 'src/schema/'),
            middleware: path.resolve(__dirname, 'src/server/middleware/'),
            service: path.resolve(__dirname, 'src/service/'),
            model: path.resolve(__dirname, 'src/model/'),
            infra: path.resolve(__dirname, 'src/infra/'),
            misc: path.resolve(__dirname, 'src/misc/'),
        },
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new WebpackBar(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('test'),
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         // { from: '.env',},
        //         { from: 's365.pub' },
        //         // { from: 'package.json' },
        //         // { from: 'ecosystem.config.js' },
        //         // { from: './config', to: 'config' },
        //         // { from: './src/server/views', to: 'views' },
        //         // { from: './src/server/public', to: 'public' },
        //     ],
        // }),
    ],
    externals,
};
