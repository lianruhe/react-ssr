require('babel-register')

const debug = require('debug')('server:compile')
const config = require('../config')

debug('Create webpack compiler.')

require('webpack')(require('../config/webpack/webpack.config.server.js')).run((err, stats) => {
  const jsonStats = stats.toJson()

  debug('Webpack compile completed.')
  console.log(stats.toString({
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true
  }))

  if (err) {
    debug('Webpack compiler encountered a fatal error.', err)
    process.exit(1)
  } else {
    if (jsonStats.errors.length > 0) {
      debug('Webpack compiler encountered errors.')
      console.log(jsonStats.errors)
      process.exit(1)
    } else if (jsonStats.warnings.length > 0) {
      debug('Webpack compiler encountered warnings.')
    } else {
      debug('No errors or warnings encountered.')
    }

    if (config.env === 'development') {
      debug('server restart!!')
      require(config.paths.dist('server.bundle.js'))
    }
  }
})
