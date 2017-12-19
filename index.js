// import path from 'path'
import debug from 'debug'
import Koa from 'koa'
import render from 'koa-ejs'
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

render(app, {
  root: config.dir_dist,
  layout: 'index'
  // viewExt: 'html',
  // cache: false,
  // debug: true
})

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

// 先匹配静态资源，允许任何下游接口中间件首先响应
app.use(serve(config.dir_dist, { defer: true }))
app.use(require('./router').routes())

const PORT = config.server_port
app.listen(PORT, () => {
  _debug(`Server is running, port: ${PORT}`)
})
