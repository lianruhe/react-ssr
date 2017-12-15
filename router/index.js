// import fs from 'fs'
import React from 'react'
import Router from 'koa-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
// import { StaticRouter, Switch, Route } from 'react-router'
import pageRoutes from '../config/routes'
import createStore from '../webapp/store'
import App from './webapp'
// import Home from '../webapp/modules/home'
// import NotFound from '../webapp/modules/404'
const debug = require('debug')('server:router')

// import os from 'os'
// import path from 'path'

const router = new Router()

// 整合所有后台服务接口
const moduleContext = require.context('./', true, /^((?!index)(?!webapp).)*\.js$/)
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
      // const Component = require(`../webapp/modules/${module}`)
      const context = {}
      const markup = renderToString(
        <Provider store={ createStore() }>
          <App path={path} context={context} />
          {/* <StaticRouter location={path} context={context}>
            <Switch>
              <Route path="/home" exact={false} component={Home} />
              <Route exact={false} component={NotFound} />
            </Switch>
          </StaticRouter> */}
        </Provider>
      )
      console.log(path)
      console.log(markup)
      console.log(context)

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        ctx.redirect(context.url)
      } else {
        // we're good, send the response
        await ctx.render('index', {
          markup,
          reduxState: JSON.stringify({ core: { progress: 50 } })
        })
        // ctx.body = '<!doctype html><html><body><div id="app">' + markup + '</div></body></html>'
      }
    })
  }
})

router.get('*', async (ctx, next) => {
  ctx.redirect('/404')
})

export default router
