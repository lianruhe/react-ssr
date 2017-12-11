import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import createStore, { history } from './store'
import { AppContainer } from 'react-hot-loader'
import createApp from './application'

// ========================================================
// Store Instantiation
// ========================================================
const store = createStore(window.___INITIAL_STATE__)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app')

const render = () => {
  ReactDOM.render(
    <AppContainer>
      { createApp(store, history) }
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
