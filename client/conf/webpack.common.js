const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv-webpack');
const html_plugin = require('html-webpack-plugin');
const { CleanWebpackPlugin: clean_plugin } = require('clean-webpack-plugin');

const common_paths = require('./common-paths');

/**
 * resolve jsconfig.json file to aliases
 * @param {import('fs').PathLike} jsconfig_path 
 * @returns {{[key: string]: string}}
 */
function resolve_jsconfig(jsconfig_path) {
  console.log(jsconfig_path);
  const { paths } = require(jsconfig_path).compilerOptions;
  const root = common_paths.client_root;
  const aliases = {};

  function purge(path) {
    return path.replace('/*', '');
  }

  for (const prop_key in paths) {
    const [prop_val] = paths[prop_key];
    aliases[purge(prop_key)] = path.resolve(root, purge(prop_val));
  }

  return aliases;
}

const babel_loader = {
  loader: require.resolve('babel-loader'),
  options: {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
  },
};

const config = {
  entry: common_paths.app_entry,
  output: {
    path: common_paths.output_path,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [babel_loader],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/],
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '*'],
    symlinks: false,
    cacheWithContext: false,
    alias: resolve_jsconfig(path.join(__dirname, '..', 'jsconfig.json'))
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    emitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new clean_plugin(),
    new dotenv({ systemvars: true }),
    new html_plugin({ template: common_paths.html_template })
  ]
};

console.log(config.resolve.alias);

module.exports = config;
