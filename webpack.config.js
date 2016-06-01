'use strict'

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: `${__dirname}/dist/`,
    filename: 'DateMonth.js',
    library: 'DateMonth'
  },
  module: {
    loaders: [
      { test: /\.css/, loader: 'style-loader!css-loader!autoprefixer-loader' },
      { test: /\.html/, loader: 'ractive' },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
}

