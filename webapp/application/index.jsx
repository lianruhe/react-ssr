import React from 'react'
import { Switch } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
// import autobind from 'autobind-decorator'

import { Progress } from 'antd'
import { history } from '../store'
import RouteAsync from './route-async'
import routes from '../../config/routes'

import 'styles/index.css'

@connect(state => ({
  progress: state.core.progress
}))
export default class App extends React.PureComponent {
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
