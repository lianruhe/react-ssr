import React from 'react'
import Router from 'koa-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import createStore from '../webapp/store'
import App from './webapp'
const debug = require('debug')('server:router')

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
// pageRoutes.forEach(route => {
//   const { path, module } = route
//   if (path && module) {
//     router.get(path, async (ctx, next) => {
//       // console.log(ctx)
//       const context = {}
//       const store = createStore()
//       const markup = renderToString(
//         <Provider store={store}>
//           <App path={path} context={context} />
//         </Provider>
//       )
//       // console.log(path)
//       // console.log(markup)
//       // console.log(context)
//       console.log(store.getState())
//
//       if (context.url) {
//         ctx.redirect(context.url)
//       } else {
//         await ctx.render('index', {
//           markup,
//           reduxState: JSON.stringify(store.getState())
//         })
//       }
//     })
//   }
// })

router.get('*', async (ctx, next) => {
  const { originalUrl } = ctx
  // 文件则直接 next
  if (/.*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|json|map|woff2|woff|eot|svg|ttf)$/.test(originalUrl)) {
    next()
  } else {
    const context = {}
    const store = createStore()
    const markup = renderToString(
      <Provider store={store}>
        <App path={originalUrl} context={context} />
      </Provider>
    )

    console.log(context)
    console.log(markup)
    // console.log(store.getState())

    if (context.url) {
      ctx.redirect(context.url)
    } else {
      await ctx.render('index', {
        markup,
        reduxState: JSON.stringify(store.getState())
      })
    }
  }
})

export default router
