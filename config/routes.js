/**
 *  路由配置信息
 *  path    [string]    路径
 *  module  [string]    哪个模块
 *  from    [string]    重定向始
 *  to      [string]    重定向到
 *  exact   [bool]      绝对匹配
 */

export default [{
  from: '/',
  to: '/home',
  exact: true // 重定向
}, {
  path: '/home',
  module: 'home'
},
// {
//   path: '/login',
//   module: 'login'
// },
{
  module: '404',
  exact: false
}]
