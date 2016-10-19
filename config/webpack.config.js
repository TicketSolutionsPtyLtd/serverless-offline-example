const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const paths = require('./paths')
const settings = require('./settings')

const preLoaders = [{
        test: /\.js$/,
        exclude: paths.appNodeModules,
        loaders: ['eslint'],
    }]

const loaders = [{
        test: /\.js?$/,
        exclude: paths.appNodeModules,
        loaders: ['babel'],
    },{
        test: /\.json?$/,
        loaders: ['json'],
    }]

const handlers = fs.readdirSync(paths.appFunctions)
    .filter(filename => /\.js$/.test(filename))
    .map(filename => ({
        [`${filename.replace('.js', '')}`]: path.join(paths.appFunctions, filename),
    }))
    .reduce((finalObject, entry) => Object.assign(finalObject, entry), {})

const plugins = [
    new webpack.DefinePlugin(settings),
    new webpack.IgnorePlugin(/\.(css|less)$/),
]

if (process.env.NODE_ENV !== 'production')
{
    // plugins.push(new webpack.BannerPlugin('require(\'dotenv\').config({silent: true})', { raw: true, entryOnly: false }));
    // plugins.push(new webpack.BannerPlugin('require(\'source-map-support\').install()', { raw: true, entryOnly: false }));
}

module.exports = {
    entry: handlers,
    output: {
        libraryTarget: 'commonjs',
        path: paths.appBuild,
        filename: '[name].js',
    },
    externals: [
        'aws-sdk',
    ],
    resolve: {
        fallback: paths.nodePaths,
        extensions: ['.js', '.json', ''],
    },
    module: {
        preLoaders: preLoaders,
        loaders: loaders
    },
    plugins: plugins,
    target: 'node',
    devtool: 'source-map',
}
