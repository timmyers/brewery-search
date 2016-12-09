import React from 'react';
import ReactDOM from 'react-dom'
import createStore from './store/createStore';
import { AppContainer } from 'react-hot-loader'
import App from 'containers/App'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  console.log("About to render");
  ReactDOM.render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}


if (__DEV__) {
  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('containers/App', () => {
      const NextApp = require('containers/App').default;
      ReactDOM.render(
        <AppContainer>
          <NextApp store={store} />
        </AppContainer>,
        root
      );
    });
  }
}

// ========================================================
// Go!
// ========================================================
render();