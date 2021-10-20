const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Start at the context path
  context: path.resolve(__dirname, '../src'),
  // Entry point...
  entry: [
    'webpack-hot-middleware/client?http://localhost:8080',
    './app.js',
  ],
  // Output endpoint (development)
  output: {
    path: '/',
    filename: 'js/app.bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  // Run tasks with loaders...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
      }, {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }, {
        // Bundle HTML partials
        test: /\.html$/,
        exclude: /index.html/,
        use: [
          'raw-loader',
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{loader: 'eslint-loader', options: {rules: {semi: 0}}}],
      },
    ],
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoEmitOnErrorsPlugin(),
    // Hot module reloading with node
    new webpack.HotModuleReplacementPlugin()
  ],
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
};
