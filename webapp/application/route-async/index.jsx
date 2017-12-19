import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types'

export default class RouteAsync extends React.PureComponent {
  static propTypes = {
    module: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      component: null
    }
  }

  componentWillMount () {
    const { module } = this.props
    if (this.props.module && typeof this.props.module === 'string') {
      import(`../../modules/${module}`)
        .then(component => {
          this.setState({
            component
          })
        })
        .catch(e => {
          console.error(e)
          throw new Error(e)
        })
    }
  }

  render () {
    const { from, to } = this.props

    // if (!authorized && path !== '/login') {
    //   return (
    //     <Redirect exact="false" to="/login" />
    //   )
    // }

    // 重定向
    if (from || to) {
      return (
        <Redirect {...this.props} />
      )
    }

    const { component } = this.state

    return (
      <Route {...this.props} component={component} />
    )
  }
}
