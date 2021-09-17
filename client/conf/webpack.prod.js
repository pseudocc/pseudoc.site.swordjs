const terser = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin: analyzer } = require('webpack-bundle-analyzer')

const config = {
  mode: 'production',
  output: {
    filename: 'static/[name].[contenthash].js'
  },
  optimization: {
    minimize: true,
    minimizer: [new terser()],
    splitChunks: {
      name: false
    }
  },
  plugins: [new analyzer({ analyzerMode: 'static', openAnalyzer: false })]
};

module.exports = config;
