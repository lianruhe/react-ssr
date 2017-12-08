import { AccountModel } from '../../mongoose'
// import { loginError } from 'error/error'
// import serverError from 'error/server-error'
// import paramError from 'error/param-error'
import handleError from 'error'

export default {
  post: async ctx => {
    const { username, password } = ctx.request.body
    console.log(`signin with username: ${username}, password: ${password}`)

    if (!username || !password) {
      handleError(ctx, 'paramsError', '用户名/密码不能为空')
    }

    try {
      const user = await AccountModel.findOne({ username, password }, 'username')
      if (!user) {
        handleError(ctx, 'loginError')
      } else {
        if (user && user.username) {
          // ctx.redirect('/')
          ctx.response.status = 200
          ctx.response.body = {
            username: user.username
          }
        }
      }
    } catch (e) {
      handleError(ctx, 'serverError', e)
    }
  }
}
