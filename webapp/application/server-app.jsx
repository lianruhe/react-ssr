import React from 'react'
import { StaticRouter, Switch } from 'react-router'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { ConnectedRouter } from 'react-router-redux'
// import autobind from 'autobind-decorator'

import { Progress } from 'antd'
// import { history } from '../store'
import RouteAsync from './route-async'
import routes from '../../config/routes'

// import 'styles/index.css'

// @connect(state => ({
//   progress: state.core.progress
// }))
export default class App extends React.PureComponent {
  static propTypes = {
    progress: PropTypes.number,
    location: PropTypes.string,
    context: PropTypes.object
  }

  render () {
    const { progress, location, context } = this.props

    return (
      <div id="container">
        {
          progress > 0 && progress <= 100 &&
          <Progress id="progress" percent={progress} showInfo={false} strokeWidth={3} />
        }
        <StaticRouter location={location} context={context}>
          <Switch>
            {routes.map((route, index) => {
              return (
                <RouteAsync key={index} {...route} />
              )
            })}
          </Switch>
        </StaticRouter>
      </div>
    )
  }
}
