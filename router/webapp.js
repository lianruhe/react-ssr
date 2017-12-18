import React from 'react'
import { StaticRouter, Switch, Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Progress } from 'antd'
import Home from '../webapp/modules/home'
import NotFound from '../webapp/modules/404'

@connect(state => ({
  progress: state.core.progress
}))
export default class App extends React.PureComponent {
  static propTypes = {
    progress: PropTypes.number,
    path: PropTypes.string,
    context: PropTypes.object
  }

  render () {
    const { progress, path, context } = this.props

    return (
      <StaticRouter location={path} context={context}>
        <div id="container">
          {
            progress > 0 && progress <= 100 &&
            <Progress id="progress" percent={progress} showInfo={false} strokeWidth={3} />
          }
          <Switch>
            <Redirect from="/" to="/home" exact />
            <Route path="/home" exact={false} component={Home} />
            <Route path="/404" exact={false} component={NotFound} />
            <Route exact={false} component={NotFound} />
          </Switch>
        </div>
      </StaticRouter>
    )
  }
}
