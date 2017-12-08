import { applyMiddleware, compose, createStore } from 'redux'
// import { routerMiddleware } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'

// import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import loggerMiddleware from 'redux-logger'
// import requestErrorMiddleware from './middleware/requestErrorMiddleware'
import rootReducer from './reducers'

// export const history = createHistory()

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, promise]

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
