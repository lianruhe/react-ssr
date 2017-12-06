import React from 'react'
import { Switch } from 'react-router'
import { history } from 'store'
import { ConnectedRouter } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import autobind from 'autobind-decorator'

import RouteAsync from './route-async'
import routes from 'routes'
import { Progress } from 'antd'

import 'styles/index.css'

const routeArray = []
// 过滤出不用渲染的 route，整理成数组，后面 level 过滤也在这里做
const filterRoute = arr => {
  arr.forEach(route => {
    const { module, from, to, subMenu } = route || {}
    if (module || (from && to)) {
      // level 过滤可以在这里操作
      routeArray.push(route)
    } else if (route.subMenu) {
      filterRoute(route.subMenu)
    }
  })
}
filterRoute(routes)

@connect(state => ({
  progress: state.core.progress,
}))
export default class App extends React.Component {
  static propTypes = {
    progress: PropTypes.number
  }

  render () {
    const { progress } = this.props

    return (
      <ConnectedRouter history={history}>
        <div id="container">
          {
            progress > 0 && progress <= 100 &&
            <Progress id="progress" percent={progress} showInfo={false} strokeWidth={3} />
          }
          <Switch>
            {routeArray.map((route, index) => {
              return (
                <RouteAsync key={index} {...route} />
              )
            })}
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
}
