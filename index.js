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

const PORT = config.server_port
app.listen(PORT, () => {
  _debug(`Server is running, port: ${PORT}`)
})
