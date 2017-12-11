import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch } from 'react-router'
// import autobind from 'autobind-decorator'

import { Progress } from 'antd'
// import { history } from '../store'
import RouteAsync from './route-async'
import routes from '../../config/routes'

import 'styles/index.css'

export default (store, history) => {
  // static propTypes = {
  //   progress: PropTypes.number
  // }
  const state = store.getState()
  const { core } = state || {}
  const { progress } = core || {}

  return (
    <Provider store={store}>
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
    </Provider>
  )
}
