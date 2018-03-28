const path = require('./path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.appSrc
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.appDist,
    hot: true
  },
  output: {
    filename: '[name].bundle.[hash].js',
    chunkFilename: '[name].chunk.[chunkhash].js',
    path: path.appDist
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        include: path.appSrc,
        loader: 'babel-loader'
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
    new CleanWebpackPlugin(['dist'], {
      root: path.appPath,
      verbose: true,
    }),
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
          test: path.appDependencies,
          enforce: true
        }
      }
    }
  }
};
