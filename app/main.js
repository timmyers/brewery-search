import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from 'containers/App';
import { setDispatch } from 'api';

import createStore from './store/createStore';

// Required material-ui
injectTapEventPlugin();

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// API Instantiation
// ========================================================
setDispatch((x) => {
  store.dispatch(x);
});

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    MOUNT_NODE
  );
};

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}


if (__DEV__) {
  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('containers/App', () => {
      const NextApp = require('containers/App').default; // eslint-disable-line global-require
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
