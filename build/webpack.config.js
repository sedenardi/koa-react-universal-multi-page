const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
    ]
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })]
};
