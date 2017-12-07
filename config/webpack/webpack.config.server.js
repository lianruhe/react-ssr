import webpack from 'webpack'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

import _debug from 'debug'
import config from '../index'
const { __PROD__ } = config.globals
const debug = _debug('server:webpack')

debug('Create configuration.')

const webpackConfig = {
  target: 'node',
  devtool: 'inline-source-map',
  entry: './index.js',
  output: {
    path: config.paths.dist(),
    publicPath: config.compiler_public_path,
    filename: 'server.bundle.js'
  },
  resolve: {
    modules: [config.paths.base(), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css']
    // alias: {
    //   'public': config.paths.public()
    // }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin(config.globals)
  ]
}

if (__PROD__) {
  debug('Enable plugins for production (Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
} else {
  webpackConfig.plugins.push(new FriendlyErrorsPlugin())
}

module.exports = webpackConfig
