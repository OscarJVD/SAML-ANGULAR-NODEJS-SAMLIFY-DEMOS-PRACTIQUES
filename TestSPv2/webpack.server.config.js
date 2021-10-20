// import * as path from 'path';
// import server from './server';
// // const {pathname: root} = new URL('../src', import.meta.url)

// module.exports = {
//   entry: "./src/index.html",
//   output: {
//     path: path.join(__dirname, '/dist'),
//     filename: 'bundle.js',
//     publicPath: '/dist/'
//   },

//   // Enable sourcemaps for debugging webpack's output.
//   devtool: "source-map",

//   resolve: {
//     // Add '.ts' and '.tsx' as resolvable extensions.
//     extensions: [".ts", ".tsx", ".js", ".json"]
//   },

//   devServer: {
//     historyApiFallback: true,
//     compress: true,
//     before: (app) => server(app)
//   },

//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         include: path.resolve(__dirname, 'src'),
//         exclude: /node_modules/,
//         loader: "ts-loader"
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       },
//       // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
//       { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
//     ]
//   },

//   // When importing a module whose path matches one of the following, just
//   // assume a corresponding global variable exists and use that instead.
//   // This is important because it allows us to avoid bundling all of our
//   // dependencies, which allows browsers to cache those libraries between builds.
// };

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: { server: './server.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for 'WARNING Critical dependency: the request of a dependency is an expression'
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};