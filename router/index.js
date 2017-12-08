// import fs from 'fs'
import React from 'react'
import Router from 'koa-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import createStore from '../webapp/store'
import pageRoutes from '../config/routes'
const debug = require('debug')('server:router')

// import os from 'os'
// import path from 'path'
function renderFullPage (html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="root">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="/static/bundle.js"></script>
    </body>
    </html>
  `
}

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
      // console.log(ctx)
      const Component = require(`../webapp/modules/${module}`)

      const html = renderToString(
        <Provider store={createStore()}>
          <Component />
        </Provider>
      )
      ctx.body = renderFullPage(html, {})
      next()
    })
  }
})

router.get('*', async (ctx, next) => {
  const Component = require('../webapp/modules/404')
  const html = renderToString(
    <Provider store={createStore()}>
      <Component />
    </Provider>
  )
  ctx.body = renderFullPage(html, {})
})

export default router
