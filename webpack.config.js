var webpack = require('webpack');
var path = require("path");
var app = path.join(__dirname, "app");

module.exports = {
  context: app,
  entry: ['./index.js'],

  output: {
    path: __dirname + '/js',
    filename: 'bundle.js'
  },

  resolve: {
    root: [app],
    extensions: ['', '.jsx', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }
      }
    ],
    plugins: [
      new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      })
    ]
  }
};
