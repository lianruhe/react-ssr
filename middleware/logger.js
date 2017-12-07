import logger from 'koa-logger'

export default async (ctx, next) => {
  if (/(\.js|\.html|\.css|\.json|\.ico|\.jpg|\.jpeg|\.png)$/.test(ctx.path)) {
    await next()
  } else {
    // must .call() to explicitly set the receiver
    await logger().call(this, ctx, next)
  }
}
