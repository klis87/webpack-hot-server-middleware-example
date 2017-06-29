const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    name: 'client',
    context: __dirname,
    entry: ['webpack-hot-middleware/client?reload=true', './src/client.js'],
    output: {
      filename: 'js/[name].js',
      path: __dirname + '/static/',
      publicPath: '/static/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [__dirname + '/src/'],
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                modules: false,
                targets: {
                  browsers: ['last 2 versions', 'ie >= 11']
                },
                useBuiltIns: true
              }],
              'stage-2',
              'react'
            ]
          }
        }
      ]
    },
    devtool: 'eval',
    plugins: [
      new HtmlWebpackPlugin({
        filename: __dirname + '/static/index.html',
        template: __dirname + '/src/index.html',
      }),
      new NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  },
  {
    name: 'server',
    context: __dirname,
    target: 'node',
    entry: './src/server-middleware.js',
    output: {
      filename: 'server.js',
      path: __dirname + '/static/',
      publicPath: '/static/',
      libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [__dirname + '/src/'],
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                modules: false,
                targets: {
                  node: 'current'
                }
              }],
              'stage-2',
              'react'
            ]
          }
        }
      ]
    },
    devtool: 'eval',
    plugins: [
      new NamedModulesPlugin()
    ]
  }
];
