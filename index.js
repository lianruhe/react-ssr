// import path from 'path'
import debug from 'debug'
import Koa from 'koa'
import middlewares from './middleware'
// import router from './router'
// import mount from 'koa-mount';
// import graphQLHTTP from 'koa-graphql';
// import convert from 'koa-convert';
import serve from 'koa-static'
import config from './config'

const _debug = debug('server:server')

// import * as middleware from './middleware'
// import schema from './graphql'
// import publish from './publish'

/**
 * ------------------------------------------
 * mongodb
 * ------------------------------------------
 */
// import './mongoose'
// global.db = mongoose.createConnection('mongodb://localhost/koa-server')

/**
 * ------------------------------------------
 * Koa
 * ------------------------------------------
 */
const app = new Koa()

app.use(middlewares)

app.use(async (ctx, next) => {
  const { response, request } = ctx
  response.append('Access-Control-Allow-Origin', request.origin)
  response.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  response.append('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,TRACE')
  response.append('Access-Control-Allow-Credentials', true)
  if (request.method.toLocaleLowerCase() === 'options') {
    ctx.status = 200
  } else {
    await next()
  }
})

app.use(serve(config.dir_public))
app.use(require('./router').routes())

// koa graphql
// app.use(mount('/graphql', convert(graphQLHTTP({ schema, pretty: true }))));

// Publish service
// app.use(mount('/publish', publish));

// if (config.globals.__DEV__) {
// koa static
// app.use(staticServer);
//
// const devMiddleware = require('./middleware/webpack-middleware').devMiddleware;
// const hotMiddleware = require('./middleware/webpack-middleware').hotMiddleware;
//
// app.use(devMiddleware);
// app.use(hotMiddleware);
// }

// server render
// app.use(middleware.serverRender);
//

const PORT = config.server_port
app.listen(PORT, () => {
  _debug(`Server is running, port: ${PORT}`)
})
