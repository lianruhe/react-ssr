// import fs from 'fs'
import Router from 'koa-router'
const debug = require('debug')('server:router')

// import os from 'os'
// import path from 'path'

const router = new Router()

// 整合所有的 route
const moduleContext = require.context('./', true, /^((?!index).)*\.js$/)

moduleContext.keys().map(path => {
  const module = moduleContext(path)

  // 后台服务接口
  if (path.match(/^\.\/api/)) {
    const api = path.slice(5, -3)
    Object.keys(module).map(method => {
      debug(`[${method}]${api}`)
      router[method](api, module[method])
    })

  // 前端页面渲染
  } else if (path.match(/^\.\/pages/)) {
    console.log(path)
  }
})

export default router
