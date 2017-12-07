/**
 * 错误类型
 * @type Object
 */
export default {
  unknowError: {
    status: 500,
    code: 'SERVER/UNKONW_ERROR',
    message: '未知错误'
  },
  serverError: {
    status: 500,
    code: 'SERVER/SERVER_ERROR',
    message: '服务器错误'
  },
  paramsError: {
    status: 400,
    code: 'SERVER/PARAM_ERROR',
    message: '参数错误'
  },
  loginError: {
    status: 400,
    code: 'SERVER/ACCOUNT_PASSWORD_ERROR',
    message: '用户名密码错误'
  }
}
