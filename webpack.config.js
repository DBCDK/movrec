'use strict';

var webpack = require('webpack');
var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var noErrorsPlugin = new webpack.NoErrorsPlugin();
var extractCss = new extractTextPlugin('../styles/style.css');

module.exports = [{
  name: 'browser',
  entry: {
    frontpage: './src/client/components/frontpage/index.js',
    styles: './src/client/sass/main.scss'
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: extractTextPlugin.extract(
          // activate source maps via loader query
          'css?sourceMap!' +
          'sass?sourceMap'
        )
      }
    ]
  },

  externals: {
    react: 'React',
    lodash: '_'
  },

  plugins: [
    commonsPlugin,
    extractCss,
    noErrorsPlugin
  ]
}
];
