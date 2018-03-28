const path = require('./path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.appSrc
  },

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
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
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
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
      verbose: true
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      
      title: 'HtmlWebpackPlugin',
      appMountId: 'app'
    })
  ]

  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     name: true,
  //     cacheGroups: {
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //       vendors: {
  //         chunks: 'initial',
  //         test: path.appDependencies,
  //         enforce: true
  //       }
  //     }
  //   }
  // }
};
