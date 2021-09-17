const webpack = require('webpack');

const PORT = process.env.PORT || 2199;

const config = {
  mode: 'development',
  output: {
    filename: '[name].[contenthash].js'
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: false
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    host: 'localhost',
    allowedHosts: 'all',
    port: PORT,
    historyApiFallback: true,
    hot: true,
    open: false
  }
};

module.exports = config;
