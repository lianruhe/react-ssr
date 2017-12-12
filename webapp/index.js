import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createStore, { history } from './store'
import { AppContainer } from 'react-hot-loader'

// ========================================================
// Store Instantiation
// ========================================================
const store = createStore(window.___INITIAL_STATE__)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app')

const render = () => {
  const App = require('./application')
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  // Developer Tools Setup
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }

  // Setup hot module replacement
  if (module.hot) {
    module.hot.accept('./application', () => {
      // 从DOM 中移除已经挂载的 React 组件 然后重装
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  }
}

// ========================================================
// Go!
// ========================================================
render()
