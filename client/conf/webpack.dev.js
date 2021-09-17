const webpack = require('webpack');
const dotenv = require('dotenv-webpack');

const { env, env_path } = require('../../utils/env');
const common_paths = require('./common-paths');

const config = {
  mode: 'development',
  output: {
    filename: '[name].[contenthash].js'
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new dotenv({ path: env_path })
  ],
  devServer: {
    host: 'localhost',
    allowedHosts: 'all',
    port: env.DEV_PORT,
    historyApiFallback: true,
    hot: true,
    open: false,
    proxy: {
      '/api': `http://localhost:${env.API_PORT}`,
    },
    static: [{directory: common_paths.public_root}]
  }
};

module.exports = config;
