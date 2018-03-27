const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  output: {
    filename: '[name].bundle.[hash].js',
    chunkFilename: '[name].chunk.[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      
      title: 'HtmlWebpackPlugin',
      appMountId: 'app',
    }),

    new webpack.HotModuleReplacementPlugin(), // 热替换插件
    new webpack.NamedModulesPlugin() // 执行热替换时打印模块名字
  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          chunks: 'initial',
          test: path.resolve(__dirname, 'node_modules'),
          enforce: true
        }
      }
    }
  }
};
