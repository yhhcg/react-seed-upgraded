const merge = require('webpack-merge');
const webpack = require('webpack');

const path = require('./path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.appDist,
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热替换插件
  ],

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  }
});
