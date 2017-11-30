var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

const PATHS = {
    entry: path.join(__dirname, 'src', 'index.js'),
    public: path.join(__dirname, 'public'),
    build: path.join(__dirname, 'public', 'build')
  };

var config = {

  devtool: 'source-map',
  entry: PATHS.entry,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [nodeModulesPath]
    },{
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
};

module.exports = config;