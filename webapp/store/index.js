import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

// import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import loggerMiddleware from 'redux-logger'
// import requestErrorMiddleware from './middleware/requestErrorMiddleware'
import rootReducer from './reducers'

export const history = __SERVER__ ? createMemoryHistory() : createBrowserHistory()

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    routerMiddleware(history),
    thunk,
    promise
  ]
  // Now you can dispatch navigation actions from anywhere!
  // store.dispatch(push('/foo'))

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  if (__DEV__) {
    const devToolsExtension = global.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }

    middleware.push(loggerMiddleware)
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers')
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
