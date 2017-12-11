// import fs from 'fs'
import React from 'react'
import Router from 'koa-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import pageRoutes from '../config/routes'
import createStore from '../webapp/store'
const debug = require('debug')('server:router')

// import os from 'os'
// import path from 'path'

const router = new Router()

// 整合所有后台服务接口
const moduleContext = require.context('./', true, /^(?!index).*\.js$/)
moduleContext.keys().map(path => {
  const module = moduleContext(path)

  const api = path.slice(1, -3)
  Object.keys(module).map(method => {
    debug(`[${method}]${api}`)
    router[method](api, module[method])
  })
})

// 前端页面渲染
pageRoutes.forEach(route => {
  const { path, module } = route
  if (path && module) {
    router.get(path, async (ctx, next) => {
      // const makeup = await require('../webapp/modules/home')
      console.log(ctx)
      const Component = require(`../webapp/modules/${module}`)

      const bodyContent = renderToString(
        <Provider store={ createStore() }>
          <Component />
        </Provider>
      )
      ctx.body = ctx.render('index', {
        bodyContent,
        reduxState: {}
      })
    })
  }
})

router.get('*', async (ctx, next) => {
  ctx.status = 404
  ctx.body = 'not found'
})

export default router
