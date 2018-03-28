const merge = require('webpack-merge');

const path = require('./path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  }
});
