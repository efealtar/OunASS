const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=false',
    './frontend/index.jsx',
  ],

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                compress: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'frontend/components'),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx'],
  },

  output: {
    path: path.resolve(__dirname, 'frontend/dist/'),
    publicPath: '/frontend/dist/',
    filename: 'bundle.js',
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
};
