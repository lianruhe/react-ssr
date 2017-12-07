import errorTypes from './error'

/**
 * 统一处理错误
 * @param  {object} ctx 请求上下文
 * @param  {string} errorType 自定义错误类型
 * @param  {error} err  抛出的错误
 */
export default (ctx, errorType, error) => {
  console.log(`[${errorType}]: ${error}`)
  const errorObj = errorTypes[errorType] || errorTypes['unknowError']
  const { status, code, message } = errorObj
  ctx.response.status = status
  ctx.response.body = {
    code,
    message,
    error
  }
}
