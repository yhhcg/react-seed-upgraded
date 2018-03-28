const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('./path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new BundleAnalyzerPlugin()
  ]
});
