import React from 'react'
import { Switch } from 'react-router'
import { history } from 'store'
import { ConnectedRouter } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import autobind from 'autobind-decorator'

import RouteAsync from './route-async'
import routes from 'routes'
import { Progress } from 'antd'

import 'styles/index.css'

@connect(state => ({
  progress: state.core.progress
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
            {routes.map((route, index) => {
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
