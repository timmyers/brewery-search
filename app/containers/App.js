import React, { PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import Router from 'react-router-addons-controlled/ControlledBrowserRouter';
import createBrowserHistory from 'history/createBrowserHistory';
import Match from 'react-router/Match';

import VerticalFlex from 'components/VerticalFlex';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orange700, orange900, brown600 } from 'material-ui/styles/colors';

import HomePage from 'containers/HomePage';
import LoginPage from 'containers/LoginPage';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange700,
    primary2Color: orange900,
    accent1Color: brown600,
  },
});

// import {NAVIGATE} from 'store/location'
export const NAVIGATE = 'NAVIGATE';

const history = createBrowserHistory();

const App = (props) => {
  const { store } = props;

  return (
    <Provider store={store}>
      <Router
        history={history}
        location={props.location}
        action={props.action}
        onChange={(location, action) => {
          // you must always dispatch a `SYNC` action,
          // because, guess what? you can't actual control the browser history!
          // anyway, use your current action not "SYNC"
          if (action === 'SYNC') {
            props.dispatch({
              type: NAVIGATE,
              location,
              action: props.action,
            });
          } else if (!window.block) {
            // if you want to block transitions go into the console and type in
            // `window.block = true` and transitions won't happen anymore
            props.dispatch({
              type: NAVIGATE,
              location,
              action,
            });
          } else {
            console.log('blocked!') // eslint-disable-line
          }
        }}
      >
        <MuiThemeProvider muiTheme={muiTheme}>
          <VerticalFlex full>
            <Match exactly pattern="/" component={HomePage} />
            <Match pattern="/login" component={LoginPage} />
          </VerticalFlex>
        </MuiThemeProvider>
      </Router>
    </Provider>
  );
};

App.propTypes = {
  location: PropTypes.object,
  action: PropTypes.string,
  dispatch: PropTypes.func,
  store: PropTypes.object.isRequired,
};

export { history };
export default connect(state => ({
  location: state.router.location,
  action: state.router.action,
}))(App);
