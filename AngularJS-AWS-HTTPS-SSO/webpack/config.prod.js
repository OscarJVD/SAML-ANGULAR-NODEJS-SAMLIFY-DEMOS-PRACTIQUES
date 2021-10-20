const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Start at the context path
  context: path.resolve(__dirname, '../src'),
  // Entry point...
  entry: {
    app: './app.js',
  },
  // Output endpoint (production)
  output: {
    path: path.resolve(__dirname, '../public/js'),
    filename: 'app.bundle.min.js',
  },
  // Run tasks with loaders...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
      }, {
        // Bundle HTML partials
        test: /\.html$/,
        exclude: /index.html/,
        use: [
          'raw-loader',
        ]
      }, {
        // Transpile SASS
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ],
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoEmitOnErrorsPlugin()
  ],
};
