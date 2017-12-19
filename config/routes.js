/**
 *  路由配置信息
 *  path    [string]    路径
 *  module  [string]    哪个模块
 *  from    [string]    重定向始
 *  to      [string]    重定向到
 *  exact   [bool]      绝对匹配，默认是 true
 */

export default [{
  path: '/home',
  module: 'home'
},
{
  from: '/',
  to: '/home',
  exact: true
},
{
  path: '/404',
  module: '404'
},
{
  module: '404',
  exact: false
}]
