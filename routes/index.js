/**
 *  路由配置信息
 *
 *
 *
 *
 */
// import demo from './demo'

export default [{
  from: '/',
  to: '/home',
  exact: true // 重定向
}, {
  icon: 'appstore',
  title: '系统菜单',
  subMenu: [{
    title: '首页',
    path: '/home',
    module: 'home'
  }]
},
{
  path: '/login',
  module: 'login'
},

// 其它模块
...demo,

// 404
{
  module: '404',
  exact: false
}]
