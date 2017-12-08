import {
  resolve
} from 'path'
import _debug from 'debug'

_debug('server:config:base')

const config = {
  env: process.env.NODE_ENV || 'development',

  pkg: require('../package.json'),

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: resolve(__dirname, '../'),
  dir_src: 'src',
  dir_dist: 'dist',
  dir_public: './webapp/static',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: '0.0.0.0', // binds to all hosts
  server_port: process.env.PORT || 3001,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  // compiler_devtool: 'source-map',
  // compiler_hash_type: 'hash',
  // compiler_html_minify: false,
  compiler_public_path: ''
}

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'process.env.NODE_ENV': JSON.stringify(config.env),
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production'
}

// ------------------------------------
// Utilities
// ------------------------------------
config.paths = (() => {
  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base,
    src: base.bind(null, config.dir_src),
    dist: base.bind(null, config.dir_dist)
  }
})()

export default config
