const merge = require('webpack-merge');
const webpack = require('webpack');

const path = require('./path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.appDist,
    historyApiFallback: true,
    hot: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热替换插件
  ],
});
