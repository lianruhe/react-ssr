import {
  resolve
} from 'path'
import _debug from 'debug'

_debug('server:config:base')

const config = {
  env: process.env.NODE_ENV || 'development',

  pkg: require('../package.json'),
  // theme name
  theme: 'default',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: resolve(__dirname, '../'),
  dir_web: 'webapp',
  dir_dist: 'dist',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: '0.0.0.0', // binds to all hosts
  server_port: process.env.PORT || 8000,
  web_port: process.env.PORT || 8001,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_html_minify: false,
  compiler_public_path: '',
  compiler_web_vendor: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router',
    'react-router-dom',
    'prop-types',
    'autobind-decorator',
    'immutable'
  ]
}

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'process.env.NODE_ENV': JSON.stringify(config.env),
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __SERVER__: config.env === 'server',
  __TEST__: config.env === 'test'
}

// ------------------------------------
// Utilities
// ------------------------------------
config.paths = (() => {
  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base,
    web: base.bind(null, config.dir_web),
    dist: base.bind(null, config.dir_dist)
  }
})()

export default config
